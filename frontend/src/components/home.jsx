import Header from "./header";
import { Link } from "react-router-dom";

function Home({theme,setTheme}){
    return(
        <div className="home page-shell">
            <Header theme={theme} setTheme={setTheme} />

            <section className="content-wrap">
                <div className="hero-card glass-card">
                    <p className="eyebrow">Workspace</p>
                    <h1>Ship better answers with a cleaner Git workflow</h1>
                    <p>
                        Build your Q&A notes, push to GitHub instantly, and keep your project history organized
                        from one dashboard.
                    </p>
                    <div className="hero-actions">
                        <Link to="/user" className="btn-primary">Start Writing</Link>
                        <Link to="/github" className="btn-ghost">Connect GitHub</Link>
                    </div>
                </div>

                <div className="feature-grid">
                    <article className="glass-card feature-card">
                        <h3>Write Faster</h3>
                        <p>Capture questions and answers in a focused editor designed for daily practice.</p>
                    </article>
                    <article className="glass-card feature-card">
                        <h3>Push Instantly</h3>
                        <p>Publish entries directly to your repository without leaving the app.</p>
                    </article>
                    <article className="glass-card feature-card">
                        <h3>Track Progress</h3>
                        <p>Use history pages to review consistency, patterns, and learning momentum.</p>
                    </article>
                </div>
            </section>
        </div>
    );
}

export default Home