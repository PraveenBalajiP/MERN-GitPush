import { useState, useEffect } from "react";
import Header from "./header";
import { Link } from "react-router-dom";
import Footer from "./footer";
import "../css/klipsan.css";

function Home({ theme, setTheme }) {
    const [gitCommands, setGitCommands] = useState("");
    const commandSequence = ["git add .", "git commit -m \"Auto sync\"", "git push origin main", "Pushed to origin/main successfully."];

    useEffect(() => {
        let fullText = "";
        let commandIndex = 0;
        let charIndex = 0;
        let timeoutId;

        const typeNextChar = () => {
            if (commandIndex < commandSequence.length) {
                const currentCommand = commandSequence[commandIndex];
                if (charIndex <= currentCommand.length) {
                    fullText =
                        commandSequence.slice(0, commandIndex).join("\n") +
                        (commandIndex > 0 ? "\n" : "") +
                        currentCommand.substring(0, charIndex);
                    setGitCommands(fullText);
                    charIndex++;
                    timeoutId = setTimeout(typeNextChar, 60);
                } else {
                    charIndex = 0;
                    commandIndex++;
                    timeoutId = setTimeout(typeNextChar, 400);
                }
            } else {
                timeoutId = setTimeout(() => {
                    fullText = "";
                    commandIndex = 0;
                    charIndex = 0;
                    typeNextChar();
                }, 2000);
            }
        };

        typeNextChar();
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className="home page-shell klipsan-page inner-app">
            <Header theme={theme} setTheme={setTheme} />

            <div className="kl-inner kl-page">
                <section className="klipsan-hero">
                    <article className="klipsan-copy">
                        <p className="kl-kicker">Workspace</p>
                        <div
                            className="klipsan-image"
                            style={{
                                minHeight: "12rem",
                                marginBottom: "1rem",
                                backgroundImage:
                                    "url('https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=80')",
                            }}
                            aria-hidden="true"
                        />
                        <h1>Ship better answers with a cleaner Git workflow.</h1>
                        <p>
                            Build your Q&amp;A notes, push to GitHub instantly, and keep your project history organized from one dashboard.
                        </p>
                        <div className="kl-home-actions">
                            <Link className="kl-btn-solid kl-home-cta" to="/user">
                                <i className="fa-solid fa-pen"/>Start Writing
                            </Link>
                            <Link
                                to="/github"
                                className="kl-btn-outline kl-home-cta"
                            >
                                <i className="fa-brands fa-github"/>Connect GitHub
                            </Link>
                        </div>
                    </article>

                    <article className="klipsan-copy">
                        <p className="kl-kicker">Terminal</p>
                        <div
                            className="klipsan-image"
                            style={{
                                minHeight: "10rem",
                                marginBottom: "1rem",
                                backgroundImage:
                                    "url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80')",
                            }}
                            aria-hidden="true"
                        />
                        <pre
                            className="kl-terminal-preview"
                        >
                            {gitCommands}
                            <span style={{ animation: "blink 1s infinite", marginLeft: "2px" }}>_</span>
                        </pre>
                    </article>
                </section>

                <div className="klipsan-grid-3">
                    <article className="klipsan-card">
                        <p className="kl-kicker">01</p>
                        <h3>Write Faster</h3>
                        <p>Capture questions and answers in a focused editor designed for daily practice.</p>
                    </article>
                    <article className="klipsan-card">
                        <p className="kl-kicker">02</p>
                        <h3>Push Instantly</h3>
                        <p>Publish entries directly to your repository without leaving the app.</p>
                    </article>
                    <article className="klipsan-card">
                        <p className="kl-kicker">03</p>
                        <h3>Track Progress</h3>
                        <p>Use history pages to review consistency, patterns, and learning momentum.</p>
                    </article>
                </div>

                <section className="klipsan-copy" style={{ gridColumn: "1 / -1" }}>
                    <p className="kl-kicker">Features</p>
                    <h2 style={{ margin: 0, fontFamily: "var(--kl-display)", fontSize: "clamp(2rem, 4vw, 2.75rem)", letterSpacing: "0.06em", fontWeight: 400 }}>
                        Everything you need to stay organized.
                    </h2>
                    <p style={{ marginTop: "0.85rem" }}>
                        Track your learning journey, maintain consistent Git history, and build a searchable knowledge base from your daily entries.
                    </p>
                </section>

                <div className="footer-shell">
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default Home;
