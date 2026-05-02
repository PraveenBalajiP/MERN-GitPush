import { Link } from "react-router-dom";

function Landing({ theme, setTheme }) {
    function swapTheme() {
        const nextTheme = theme === "light" ? "dark" : "light";
        setTheme(nextTheme);
        localStorage.setItem("theme", nextTheme);
    }

    return (
        <div className="landing-page page-shell">
            <header className="landing-nav glass-card">
                <div className="landing-brand">
                    <span className="landing-mark" aria-hidden="true">&gt;_</span>
                    <div>
                        <p className="eyebrow">GitPush Studio</p>
                        <h1>Ship like a Unix terminal, not a form wizard.</h1>
                    </div>
                </div>

                <div className="landing-nav-actions">
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="btn-ghost">
                        <i className="fa-brands fa-github" aria-hidden="true"></i>
                        GitHub
                    </a>
                    <button type="button" className="btn-ghost theme-switch" onClick={swapTheme}>
                        {theme === "light" ? "Dark" : "Light"}
                    </button>
                    <Link to="/login" className="btn-ghost">Login</Link>
                    <Link to="/register" className="btn-primary">Register</Link>
                </div>
            </header>

            <section className="landing-hero content-wrap">
                <article className="glass-card terminal-card">
                    <div className="terminal-topbar">
                        <span></span>
                        <span></span>
                        <span></span>
                        <p>gitpush@workspace:~</p>
                    </div>
                    <div className="terminal-body">
                        <p><span className="prompt">$</span> git status</p>
                        <p className="terminal-ok">On branch learning/main</p>
                        <p className="terminal-ok">Your notes are ready to push.</p>
                        <p><span className="prompt">$</span> npm run sync:github</p>
                        <p className="terminal-ok">Pushing question.txt + answer.txt</p>
                        <p className="terminal-accent">Done in 1.4s</p>
                        <p><span className="prompt">$</span> open /dashboard</p>
                    </div>
                </article>

                <article className="glass-card landing-copy-card">
                    <p className="eyebrow">Developer First</p>
                    <h2>Write answers, version everything, and keep your flow state intact.</h2>
                    <p>
                        Built for students and builders who think in commits. Draft your entries,
                        keep a clean history, and push directly to your repository with one workspace.
                    </p>
                    <div className="landing-cta-group">
                        <Link to="/register" className="btn-primary">Create Free Account</Link>
                        <Link to="/login" className="btn-ghost">I already have an account</Link>
                    </div>
                </article>
            </section>

            <section className="landing-panels">
                <article className="glass-card panel-card">
                    <p className="panel-label">01</p>
                    <h3>Code-like workspace</h3>
                    <p>Terminal-inspired layout, focused writing blocks, and no visual clutter.</p>
                </article>
                <article className="glass-card panel-card">
                    <p className="panel-label">02</p>
                    <h3>GitHub native rhythm</h3>
                    <p>Configure repository settings once, then push your entries as clean commits.</p>
                </article>
                <article className="glass-card panel-card">
                    <p className="panel-label">03</p>
                    <h3>Unix style clarity</h3>
                    <p>Readable monospace typography, subtle scanline texture, and tactile motion.</p>
                </article>
            </section>
        </div>
    );
}

export default Landing;
