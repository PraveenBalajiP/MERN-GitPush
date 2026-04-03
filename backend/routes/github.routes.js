import express from "express";
import axios from "axios";
import User from "../models/user.models.js";
import protectedRoute from "../middleware/protectedRoute.js";

const router = express.Router();

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

router.post("/push", protectedRoute, async (req, res) => {
    try {
        const { question, answer } = req.body;
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

        if (!question || !answer) {
            return res.status(400).json({ message: "Question and answer are required" });
        }

        const entryFolderName = `${Date.now()}-${slugify(question)}`;
        const folder = sanitizePath(config.folderPath);
        const entryFolderPath = folder ? `${folder}/${entryFolderName}` : entryFolderName;

        const questionPath = `${entryFolderPath}/question.txt`;
        const answerPath = `${entryFolderPath}/answer.txt`;
        const baseRepoUrl = `https://api.github.com/repos/${config.repoOwner}/${config.repoName}/contents`;

        await uploadFile({
            apiUrl: `${baseRepoUrl}/${questionPath}`,
            message: `Add question file: ${questionPath}`,
            content: buildTextFileContent("Question", question.trim()),
            branch: config.branch || "main",
            token: config.token
        });

        await uploadFile({
            apiUrl: `${baseRepoUrl}/${answerPath}`,
            message: `Add answer file: ${answerPath}`,
            content: buildTextFileContent("Answer", answer.trim()),
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
});

export default router;
