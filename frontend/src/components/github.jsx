import { useEffect, useState } from "react";
import api from "../api.js";
import toast from "react-hot-toast";
import Header from "./header";
import Footer from "./footer";
import "../css/klipsan.css";

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
                const response = await api.get("/api/github/config");

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

            const response = await api.post("/api/github/config", payload);

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
        <div className="github-page page-shell klipsan-auth-page">
            <Header theme={theme} setTheme={setTheme} />

            <section className="klipsan-auth-grid">
                <article className="klipsan-auth-copy">
                    <div
                        className="klipsan-auth-visual"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80')",
                        }}
                        aria-hidden="true"
                    />
                    <div>
                        <p className="kl-kicker">Integration</p>
                        <h1>GitHub Settings</h1>
                        <p>Link your repository once and push Q&amp;A entries from your workspace anytime.</p>
                    </div>
                    <ul className="klipsan-auth-list">
                        <li>Repository owner and branch configuration</li>
                        <li>Automated push workflow</li>
                        <li>Secure token storage</li>
                    </ul>
                </article>

                <form className="klipsan-auth-form" onSubmit={saveConfig}>
                    <p className="kl-kicker">Repository target</p>
                    <h2>Configuration</h2>
                    <div className="klipsan-fields">
                        <input
                            id="repoOwner"
                            className="klipsan-input"
                            type="text"
                            value={repoOwner}
                            onChange={(e) => setRepoOwner(e.target.value)}
                            placeholder="example: octocat"
                            required
                        />
                        <input
                            id="repoName"
                            className="klipsan-input"
                            type="text"
                            value={repoName}
                            onChange={(e) => setRepoName(e.target.value)}
                            placeholder="example: notes-repo"
                            required
                        />
                        <input
                            id="branch"
                            className="klipsan-input"
                            type="text"
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                            placeholder="example: main"
                            required
                        />
                        <input
                            id="folderPath"
                            className="klipsan-input"
                            type="text"
                            value={folderPath}
                            onChange={(e) => setFolderPath(e.target.value)}
                            placeholder="example: answers/daily"
                        />
                        <input
                            id="token"
                            className="klipsan-input"
                            type="password"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            placeholder={hasToken ? "Token already saved. Enter only to update." : "ghp_..."}
                        />
                    </div>
                    <button className="klipsan-button" style={{ marginTop: '0.5rem' }} type="submit">Save Settings</button>
                    <p className="klipsan-auth-foot" style={{ marginTop: '0.5rem' }}>
                        Token status: <strong>{hasToken ? "Saved" : "Not saved"}</strong>
                    </p>
                </form>
            </section>

            <div className="footer-shell">
                <Footer />
            </div>
        </div>
    );
}

export default Github;