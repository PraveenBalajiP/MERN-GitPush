import { Link } from "react-router-dom";
import Footer from "./footer";
import "../css/klipsan.css";

const IMG = {
    hero: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=2000&q=80",
    amenities: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    schedule: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80",
    g1: "https://images.unsplash.com/photo-1517180102440-6d3b36f7c6e6?auto=format&fit=crop&w=900&q=80",
    g2: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
    g3: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
    g4: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    g5: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80",
    g6: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
};

function Landing() {
    return (
        <div className="landing-page klipsan-page">
            <header className="kl-header">
                <div className="kl-inner kl-header-inner">
                    <Link className="kl-wordmark" to="/">
                        GITPUSH STUDIO
                    </Link>
                    <nav className="kl-nav" aria-label="Primary">
                        <Link to="/home">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/history">History</Link>
                        <Link to="/user">Workspace</Link>
                        <Link className="kl-btn-solid" to="/register">
                            Register
                        </Link>
                        <Link to="/login">Log in</Link>
                    </nav>
                </div>
            </header>

            <section className="kl-hero" aria-label="Introduction">
                <div
                    className="kl-hero-media"
                    style={{ backgroundImage: `url(${IMG.hero})` }}
                />
                <div className="kl-inner kl-hero-copy">
                    <h1>Ship better answers with a cleaner Git workflow.</h1>
                    <p className="kl-deck">
                        Replace complex terminal workflows with a single click.
                    </p>
                    <p className="kl-lede">
                        Built for developers who want to avoid the tedious cycle of staging, committing, and pushing. We map your entire Git flow into focused workspace interfaces.
                    </p>
                </div>
            </section>

            <section className="kl-section" aria-labelledby="amenities-heading">
                <div className="kl-inner">
                    <p id="amenities-heading" className="kl-kicker">
                        Workspace
                    </p>
                    <p>
                        Capture questions and answers in a focused editor designed for daily practice, then publish the result straight to GitHub.
                    </p>
                    <div className="kl-dot-row">
                        <span>Write Faster</span>
                        <span>Push Instantly</span>
                        <span>Track Progress</span>
                        <span>Repository Ready</span>
                        <span>Session Cookies</span>
                        <span>Clean Commit History</span>
                    </div>
                </div>
            </section>

            <section className="kl-split" aria-labelledby="schedule-heading">
                <div className="kl-split-copy">
                    <p id="schedule-heading" className="kl-kicker">
                        Git flow
                    </p>
                    <h2>Draft, commit, push.</h2>
                    <p>
                        Use the workspace to write your Q&amp;A notes, organize them clearly, and send them to your configured repository without leaving the app.
                    </p>
                    <div className="kl-nav" style={{ marginTop: "0.5rem" }}>
                        <Link className="kl-btn-solid" to="/register">
                            Get started
                        </Link>
                        <Link to="/login">Member login</Link>
                    </div>
                </div>
                <div
                    className="kl-split-media"
                    style={{ backgroundImage: `url(${IMG.schedule})` }}
                    role="presentation"
                />
            </section>

            <section className="kl-split" aria-labelledby="floor-heading">
                <div
                    className="kl-split-media"
                    style={{ backgroundImage: `url(${IMG.amenities})` }}
                    role="presentation"
                />
                <div className="kl-split-copy">
                    <p id="floor-heading" className="kl-kicker">
                        Features
                    </p>
                    <h2>Keep writing. Keep shipping.</h2>
                    <p>
                        MERN architecture keeps the app lightweight while still being scalable for future features.
                    </p>
                </div>
            </section>

            <section className="kl-quote" aria-label="Member testimonial">
                <div className="kl-inner">
                    <div className="kl-quote-mark" aria-hidden="true">
                        &ldquo;
                    </div>
                    <blockquote>
                        REPLACE YOUR TERMINAL ROUTINE WITH A CLEANER WORKSPACE FLOW.
                    </blockquote>
                    <cite>— GitPush Studio</cite>
                </div>
            </section>

            <section className="kl-section alt" aria-labelledby="locations-heading">
                <div className="kl-inner">
                    <p id="locations-heading" className="kl-kicker">
                        Get started
                    </p>
                    <h2>Create, connect, and push.</h2>
                    <div className="kl-locations">
                        <div className="kl-loc-card">
                            <h3>Register</h3>
                            <p>
                                {`Create your workspace identity, set your password, and start publishing entries.`}
                            </p>
                        </div>
                        <div className="kl-loc-card">
                            <h3>Login</h3>
                            <p>
                                {`Authenticate quickly, open your dashboard, and continue where you left off.`}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="kl-gallery" aria-label="Project gallery">
                <figure>
                    <img src={IMG.g1} alt="Developer working at a laptop" loading="lazy" />
                </figure>
                <figure>
                    <img src={IMG.g2} alt="Code editor on a large monitor" loading="lazy" />
                </figure>
                <figure>
                    <img src={IMG.g3} alt="Clean terminal workflow" loading="lazy" />
                </figure>
                <figure>
                    <img src={IMG.g4} alt="Pair programming session" loading="lazy" />
                </figure>
                <figure>
                    <img src={IMG.g5} alt="Git commit history on screen" loading="lazy" />
                </figure>
                <figure>
                    <img src={IMG.g6} alt="Workspace setup with notebook and laptop" loading="lazy" />
                </figure>
            </section>

            <div className="footer-shell">
                <Footer />
            </div>
        </div>
    );
}

export default Landing;
