import Header from "./header";
import Footer from "./footer";
import "../css/klipsan.css";

function About({ theme, setTheme }) {
    return (
        <div className="about page-shell klipsan-page inner-app">
            <Header theme={theme} setTheme={setTheme} />

            <div className="kl-inner klipsan-stack" style={{ marginTop: "1rem" }}>
                <section className="klipsan-hero">
                    <article className="klipsan-copy">
                        <p className="kl-kicker">About</p>
                        <h1>Built for practical learning and clean commits</h1>
                        <p>
                            This project helps you practice by converting each question and answer into structured notes, then publishing those notes to GitHub with a single action.
                        </p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1rem" }}>
                            <span className="kl-chip">Focused workflow</span>
                            <span className="kl-chip">Version friendly</span>
                            <span className="kl-chip">Simple stack</span>
                        </div>
                    </article>

                    <div
                        className="klipsan-image"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80')",
                        }}
                        aria-hidden="true"
                    />
                </section>

                <div className="klipsan-grid-3">
                    <article className="klipsan-card">
                        <h3>Focused workflow</h3>
                        <p>Keep writing, saving, and publishing in one place instead of juggling multiple tools.</p>
                    </article>
                    <article className="klipsan-card">
                        <h3>Version friendly</h3>
                        <p>Every pushed answer is easy to track, review, and restore from your repository history.</p>
                    </article>
                    <article className="klipsan-card">
                        <h3>Simple stack</h3>
                        <p>MERN architecture keeps the app lightweight while still being scalable for future features.</p>
                    </article>
                </div>

                <div className="footer-shell">
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default About;
