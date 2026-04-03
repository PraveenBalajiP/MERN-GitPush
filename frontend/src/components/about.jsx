import Header from "./header";

function About({theme,setTheme}){
    return(
        <div className="about page-shell">
            <Header theme={theme} setTheme={setTheme} />

            <section className="content-wrap">
                <article className="glass-card info-card">
                    <p className="eyebrow">About</p>
                    <h1>Built for practical learning and clean commits</h1>
                    <p>
                        This project helps you practice by converting each question and answer into structured
                        notes, then publishing those notes to GitHub with a single action.
                    </p>
                </article>

                <div className="info-grid">
                    <article className="glass-card info-tile">
                        <h3>Focused Workflow</h3>
                        <p>Keep writing, saving, and publishing in one place instead of juggling multiple tools.</p>
                    </article>
                    <article className="glass-card info-tile">
                        <h3>Version Friendly</h3>
                        <p>Every pushed answer is easy to track, review, and restore from your repository history.</p>
                    </article>
                    <article className="glass-card info-tile">
                        <h3>Simple Stack</h3>
                        <p>MERN architecture keeps the app lightweight while still being scalable for future features.</p>
                    </article>
                </div>
            </section>
        </div>
    );
}

export default About