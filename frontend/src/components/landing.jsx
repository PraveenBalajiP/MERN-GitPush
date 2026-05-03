import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Landing({ theme, setTheme }) {
    function swapTheme() {
        const nextTheme = theme === "light" ? "dark" : "light";
        setTheme(nextTheme);
        localStorage.setItem("theme", nextTheme);
    }

    const fullText = `git add .
> git commit -m "Auto sync"
> git push origin main
[main 4f2a1c] Auto sync
 1 file changed, 10 insertions(+)
 Pushed to origin/main successfully.`;

    const [typedText, setTypedText] = useState("");

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < fullText.length) {
                setTypedText((prev) => prev + fullText.charAt(index));
                index++;
            } else {
                clearInterval(interval);
            }
        }, 50); // fast typing speed
        return () => clearInterval(interval);
    }, [fullText]);

    return (
        <div className="landing-page page-shell">
            <header className="landing-nav glass-card">
                <div className="landing-brand">
                    <span className="landing-mark" aria-hidden="true">
                        <i className="fa-solid fa-terminal"></i>
                    </span>
                    <div>
                        <p className="eyebrow">GIT AUTOMATION UI</p>
                        <h1>MERN Studio</h1>
                    </div>
                </div>

                <div className="landing-nav-actions">
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="btn-ghost" style={{textDecoration: 'none'}}>
                        <i className="fa-brands fa-github" aria-hidden="true" style={{marginRight: '8px'}}></i>
                        GitHub
                    </a>
                    <button type="button" className="btn-ghost theme-switch" onClick={swapTheme}>
                        <i className={`fa-solid ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
                    </button>
                    <Link to="/login" className="btn-ghost" style={{textDecoration: 'none'}}>Login</Link>
                    <Link to="/register" className="btn-primary" style={{textDecoration: 'none'}}>Register</Link>
                </div>
            </header>

            <main className="bento-grid content-wrap">
                <article className="glass-card bento-item bento-hero">
                    <p className="eyebrow">THE ULTIMATE GIT PIPELINE</p>
                    <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", margin: "0.5rem 0", lineHeight: "1.2" }}>
                        Replace complex terminal workflows with a <span className="highlight">single click</span>.
                    </h2>
                    <p style={{ fontSize: "1.1rem", margin: "1.5rem 0", lineHeight: "1.6" }}>
                        Built for developers who want to avoid the tedious cycle of staging, committing, and pushing. We map out your entire <span className="highlight">Git Flow</span> into easy, actionable workspace interfaces.
                    </p>
                    <div className="landing-cta-group" style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                        <Link to="/register" className="btn-primary" style={{textDecoration: 'none'}}>Get Started Demo</Link>
                    </div>
                </article>

                <article className="glass-card bento-item bento-terminal">
                    <div className="terminal-topbar" style={{ display: 'flex', gap: '8px', borderBottom: '2px solid var(--text-primary)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--danger)', border: '2px solid var(--text-primary)' }}></div>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#fbbf24', border: '2px solid var(--text-primary)' }}></div>
                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--success)', border: '2px solid var(--text-primary)' }}></div>
                    </div>
                    <div className="terminal-body" style={{ minHeight: '150px' }}>
                        <p style={{ margin: '0 0 0.5rem' }}>
                            <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>~ ❯</span>{" "}
                            {typedText}
                            <span className="cursor-blink">|</span>
                        </p>
                    </div>
                </article>

                <article className="glass-card bento-item bento-step">
                    <h1 style={{ margin: "0 0 1rem", fontSize: "3rem", color: "var(--text-primary)", display: 'flex', alignItems: 'center', gap: '1rem' }}>01 <i className="fa-brands fa-github"></i></h1>
                    <h3>Integrate Hub</h3>
                    <p>Connect your personal access tokens securely. Select target repositories.</p>
                </article>

                <article className="glass-card bento-item bento-step">
                    <h1 style={{ margin: "0 0 1rem", fontSize: "3rem", color: "var(--text-primary)", display: 'flex', alignItems: 'center', gap: '1rem' }}>02 <i className="fa-solid fa-code-commit"></i></h1>
                    <h3>Draft Commits</h3>
                    <p>Use our dedicated workspace forms to draft changes, write commit messages, and document answers.</p>
                </article>

                <article className="glass-card bento-item bento-step bento-step-wide">
                    <h1 style={{ margin: "0 0 1rem", fontSize: "3rem", color: "var(--text-primary)", display: 'flex', alignItems: 'center', gap: '1rem' }}>03 <i className="fa-solid fa-rocket"></i></h1>
                    <h3>Combine & Push</h3>
                    <p>Hit the automated action. Your <span className="highlight">add</span>, <span className="highlight">commit</span>, and <span className="highlight">push</span> are batched into one seamless script.</p>
                </article>
            </main>
        </div>
    );
}

export default Landing;
