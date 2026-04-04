import express from "express";
import axios from "axios";
import multer from "multer";
import User from "../models/user.models.js";
import protectedRoute from "../middleware/protectedRoute.js";

const router = express.Router();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 2 * 1024 * 1024
    }
});

function sanitizePath(value) {
    return (value || "")
        .trim()
        .replace(/\\/g, "/")
        .replace(/^\/+|\/+$/g, "");
}

function slugify(value) {
    return (value || "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 50) || "entry";
}

function buildTextFileContent(title, content) {
    return [
        `${title}:`,
        "",
        content,
        ""
    ].join("\n");
}

async function uploadFile({ apiUrl, message, content, branch, token }) {
    return axios.put(
        apiUrl,
        {
            message,
            content: Buffer.from(content, "utf-8").toString("base64"),
            branch
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/vnd.github+json"
            }
        }
    );
}

router.get("/config", protectedRoute, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const config = user.githubConfig || {};
        return res.status(200).json({
            repoOwner: config.repoOwner || "",
            repoName: config.repoName || "",
            branch: config.branch || "main",
            folderPath: config.folderPath || "",
            hasToken: Boolean(config.token)
        });
    } catch (error) {
        return res.status(500).json({ message: "Failed to load GitHub config" });
    }
});

router.post("/config", protectedRoute, async (req, res) => {
    try {
        const { repoOwner, repoName, branch, folderPath, token } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const nextConfig = {
            repoOwner: (repoOwner || "").trim(),
            repoName: (repoName || "").trim(),
            branch: (branch || "main").trim(),
            folderPath: sanitizePath(folderPath),
            token: (token || user.githubConfig?.token || "").trim()
        };

        user.githubConfig = nextConfig;
        await user.save();

        return res.status(200).json({ message: "GitHub config saved" });
    } catch (error) {
        return res.status(500).json({ message: "Failed to save GitHub config" });
    }
});

router.post(
    "/push",
    protectedRoute,
    upload.fields([
        { name: "questionFile", maxCount: 1 },
        { name: "answerFile", maxCount: 1 }
    ]),
    async (req, res) => {
    try {
        const questionText = (req.body.question || "").trim();
        const answerText = (req.body.answer || "").trim();
        const commitMessage = (req.body.commitMessage || "").trim();
        const requestedEntryFolderName = sanitizePath(req.body.entryFolderName || "");
        const questionFile = req.files?.questionFile?.[0];
        const answerFile = req.files?.answerFile?.[0];
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const config = user.githubConfig || {};
        if (!config.repoOwner || !config.repoName || !config.token) {
            return res.status(400).json({
                message: "Missing GitHub settings. Please configure repo owner, repo name, and token first."
            });
        }

        const questionContent = questionFile
            ? questionFile.buffer.toString("utf-8").trim()
            : questionText;
        const answerContent = answerFile
            ? answerFile.buffer.toString("utf-8").trim()
            : answerText;

        if (!questionContent || !answerContent) {
            return res.status(400).json({
                message: "Question and answer are required as text or files"
            });
        }

        const safeCustomFolderName = requestedEntryFolderName
            .split("/")
            .filter(Boolean)
            .map((part) => slugify(part))
            .join("/");
        const entryFolderName = safeCustomFolderName || `${Date.now()}-${slugify(questionContent)}`;
        const folder = sanitizePath(config.folderPath);
        const entryFolderPath = folder ? `${folder}/${entryFolderName}` : entryFolderName;

        const questionPath = `${entryFolderPath}/question.txt`;
        const answerPath = `${entryFolderPath}/answer.txt`;
        const baseRepoUrl = `https://api.github.com/repos/${config.repoOwner}/${config.repoName}/contents`;

        await uploadFile({
            apiUrl: `${baseRepoUrl}/${questionPath}`,
            message: commitMessage || `Add question file: ${questionPath}`,
            content: buildTextFileContent("Question", questionContent),
            branch: config.branch || "main",
            token: config.token
        });

        await uploadFile({
            apiUrl: `${baseRepoUrl}/${answerPath}`,
            message: commitMessage || `Add answer file: ${answerPath}`,
            content: buildTextFileContent("Answer", answerContent),
            branch: config.branch || "main",
            token: config.token
        });

        return res.status(200).json({
            message: "Pushed to GitHub successfully",
            folder: entryFolderPath,
            files: {
                question: questionPath,
                answer: answerPath
            }
        });
    } catch (error) {
        const status = error.response?.status || 500;
        const details = error.response?.data?.message || error.message;
        return res.status(status).json({ message: `GitHub push failed: ${details}` });
    }
}
);

router.get("/history", protectedRoute, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const config = user.githubConfig || {};
        if (!config.repoOwner || !config.repoName || !config.token) {
            return res.status(400).json({
                message: "Missing GitHub settings. Configure repo owner, repo name, and token first."
            });
        }

        const requestedLimit = Number(req.query.limit);
        const limit = Number.isFinite(requestedLimit)
            ? Math.min(Math.max(requestedLimit, 1), 30)
            : 12;

        const commitsUrl = `https://api.github.com/repos/${config.repoOwner}/${config.repoName}/commits`;
        const response = await axios.get(commitsUrl, {
            headers: {
                Authorization: `Bearer ${config.token}`,
                Accept: "application/vnd.github+json"
            },
            params: {
                sha: config.branch || "main",
                per_page: limit,
                ...(config.folderPath ? { path: sanitizePath(config.folderPath) } : {})
            }
        });

        const history = (response.data || []).map((item) => ({
            sha: item.sha,
            message: item.commit?.message || "No commit message",
            author: item.commit?.author?.name || "Unknown",
            date: item.commit?.author?.date || null,
            url: item.html_url || ""
        }));

        return res.status(200).json({ history });
    } catch (error) {
        const status = error.response?.status || 500;
        const details = error.response?.data?.message || error.message;
        return res.status(status).json({ message: `Failed to fetch history: ${details}` });
    }
});

export default router;
