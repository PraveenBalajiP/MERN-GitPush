import { useEffect, useState } from "react";
import api from "../api.js";
import Header from "./header";
import Footer from "./footer";
import "../css/klipsan.css";

function History({ theme, setTheme }) {
    const [historyItems, setHistoryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    async function loadHistory() {
        try {
            setLoading(true);
            setErrorMessage("");
            const response = await api.get("/api/github/history?limit=12");
            setHistoryItems(response.data?.history || []);
        } catch (error) {
            setHistoryItems([]);
            setErrorMessage(error.response?.data?.message || "Unable to load history right now.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadHistory();
    }, []);

    function formatDate(value) {
        if (!value) {
            return "Unknown date";
        }
        const parsedDate = new Date(value);
        if (Number.isNaN(parsedDate.getTime())) {
            return "Unknown date";
        }
        return parsedDate.toLocaleString();
    }

    return (
        <div className="history page-shell klipsan-page inner-app">
            <Header theme={theme} setTheme={setTheme} />

            <div className="kl-inner kl-page">
                <section className="klipsan-hero">
                    <article className="klipsan-copy">
                        <p className="kl-kicker">History</p>
                        <h1>Your learning journey, commit by commit</h1>
                        <p>Track recent repository updates created from your workspace pushes.</p>
                        <button
                            type="button"
                            className="klipsan-button ghost"
                            style={{ marginTop: "1rem", width: "fit-content" }}
                            onClick={loadHistory}
                        >
                            Refresh history
                        </button>
                    </article>

                    <div
                        className="klipsan-image"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1400&q=80')",
                        }}
                        aria-hidden="true"
                    />
                </section>

                {loading && (
                    <div className="timeline">
                        <article className="klipsan-card timeline-item">
                            <span>··</span>
                            <div>
                                <h3>Loading history</h3>
                                <p>Fetching latest commits from your configured GitHub repository.</p>
                            </div>
                        </article>
                    </div>
                )}

                {!loading && errorMessage && (
                    <div className="timeline">
                        <article className="klipsan-card timeline-item">
                            <span>!</span>
                            <div>
                                <h3>History unavailable</h3>
                                <p>{errorMessage}</p>
                            </div>
                        </article>
                    </div>
                )}

                {!loading && !errorMessage && historyItems.length === 0 && (
                    <div className="timeline">
                        <article className="klipsan-card timeline-item">
                            <span>0</span>
                            <div>
                                <h3>No updates yet</h3>
                                <p>Push at least one question/answer pair from workspace to see history entries.</p>
                            </div>
                        </article>
                    </div>
                )}

                {!loading && !errorMessage && historyItems.length > 0 && (
                    <div className="timeline">
                        {historyItems.map((item, index) => (
                            <article className="klipsan-card timeline-item" key={item.sha}>
                                <span>{String(index + 1).padStart(2, "0")}</span>
                                <div>
                                    <h3>{item.message}</h3>
                                    <p>
                                        {item.author} • {formatDate(item.date)}
                                    </p>
                                    {item.url && (
                                        <a className="timeline-link" href={item.url} target="_blank" rel="noreferrer">
                                            View commit
                                        </a>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                )}

                <div className="footer-shell">
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default History;
