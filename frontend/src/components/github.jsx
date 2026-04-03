import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "./header";
import "../css/github.css";

function Github({ theme, setTheme }) {
    const [repoOwner, setRepoOwner] = useState("");
    const [repoName, setRepoName] = useState("");
    const [branch, setBranch] = useState("main");
    const [folderPath, setFolderPath] = useState("");
    const [token, setToken] = useState("");
    const [hasToken, setHasToken] = useState(false);

    useEffect(() => {
        const loadConfig = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/github/config", {
                    withCredentials: true
                });

                setRepoOwner(response.data.repoOwner || "");
                setRepoName(response.data.repoName || "");
                setBranch(response.data.branch || "main");
                setFolderPath(response.data.folderPath || "");
                setHasToken(Boolean(response.data.hasToken));
            } catch (error) {
                toast.error("Failed to load GitHub settings");
            }
        };

        loadConfig();
    }, []);

    async function saveConfig(event) {
        event.preventDefault();
        try {
            const payload = { repoOwner, repoName, branch, folderPath };
            if (token.trim()) {
                payload.token = token;
            }

            const response = await axios.post("http://localhost:5000/api/github/config", payload, {
                withCredentials: true
            });

            toast.success(response.data.message || "GitHub settings saved");
            if (token.trim()) {
                setHasToken(true);
                setToken("");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to save settings");
        }
    }

    return (
        <div className="github-page page-shell">
            <Header theme={theme} setTheme={setTheme} />
            <section className="content-wrap">
                <form className="github-card glass-card" onSubmit={saveConfig}>
                    <p className="eyebrow">Integration</p>
                    <h1>GitHub Settings</h1>
                    <p className="github-intro">Link your repository once and push Q&A entries from your workspace anytime.</p>

                    <div className="github-field">
                        <label htmlFor="repoOwner">Repository Owner</label>
                        <input
                            id="repoOwner"
                            type="text"
                            value={repoOwner}
                            onChange={(e) => setRepoOwner(e.target.value)}
                            placeholder="example: octocat"
                            required
                        />
                    </div>

                    <div className="github-field">
                        <label htmlFor="repoName">Repository Name</label>
                        <input
                            id="repoName"
                            type="text"
                            value={repoName}
                            onChange={(e) => setRepoName(e.target.value)}
                            placeholder="example: notes-repo"
                            required
                        />
                    </div>

                    <div className="github-field">
                        <label htmlFor="branch">Branch</label>
                        <input
                            id="branch"
                            type="text"
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                            placeholder="example: main"
                            required
                        />
                    </div>

                    <div className="github-field">
                        <label htmlFor="folderPath">Folder Path In Repo</label>
                        <input
                            id="folderPath"
                            type="text"
                            value={folderPath}
                            onChange={(e) => setFolderPath(e.target.value)}
                            placeholder="example: answers/daily"
                        />
                    </div>

                    <div className="github-field">
                        <label htmlFor="token">GitHub Token</label>
                        <input
                            id="token"
                            type="password"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            placeholder={hasToken ? "Token already saved. Enter only to update." : "ghp_..."}
                        />
                    </div>

                    <button className="github-save" type="submit">Save Settings</button>
                    <p className="github-hint">Token status: {hasToken ? "Saved" : "Not saved"}</p>
                </form>
            </section>
        </div>
    );
}

export default Github;