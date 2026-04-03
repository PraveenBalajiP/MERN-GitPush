import Header from "./header";

function History({theme,setTheme}){
    return(
        <div className="history page-shell">
            <Header theme={theme} setTheme={setTheme} />

            <section className="content-wrap">
                <article className="glass-card info-card">
                    <p className="eyebrow">History</p>
                    <h1>Your learning journey, commit by commit</h1>
                    <p>
                        Use this page as a roadmap for your progress. Keep the rhythm: write, push, reflect, repeat.
                    </p>
                </article>

                <div className="timeline">
                    <article className="glass-card timeline-item">
                        <span>01</span>
                        <div>
                            <h3>Capture the idea</h3>
                            <p>Draft the question and a clear answer in your workspace.</p>
                        </div>
                    </article>
                    <article className="glass-card timeline-item">
                        <span>02</span>
                        <div>
                            <h3>Push to repository</h3>
                            <p>Publish instantly to your configured branch and folder path.</p>
                        </div>
                    </article>
                    <article className="glass-card timeline-item">
                        <span>03</span>
                        <div>
                            <h3>Review and improve</h3>
                            <p>Revisit prior notes, identify weak spots, and iterate with better answers.</p>
                        </div>
                    </article>
                </div>
            </section>
        </div>
    );
}

export default History