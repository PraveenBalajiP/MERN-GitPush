import { useEffect, useState } from "react";
import api from "../api.js";
import Header from "./header";

function History({theme,setTheme}){
    const [historyItems,setHistoryItems]=useState([]);
    const [loading,setLoading]=useState(true);
    const [errorMessage,setErrorMessage]=useState("");

    async function loadHistory(){
        try{
            setLoading(true);
            setErrorMessage("");
            const response=await api.get("/api/github/history?limit=12");
            setHistoryItems(response.data?.history || []);
        }
        catch(error){
            setHistoryItems([]);
            setErrorMessage(error.response?.data?.message || "Unable to load history right now.");
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        loadHistory();
    },[]);

    function formatDate(value){
        if(!value){
            return "Unknown date";
        }
        const parsedDate=new Date(value);
        if(Number.isNaN(parsedDate.getTime())){
            return "Unknown date";
        }
        return parsedDate.toLocaleString();
    }

    return(
        <div className="history page-shell">
            <Header theme={theme} setTheme={setTheme} />

            <section className="content-wrap">
                <article className="glass-card info-card">
                    <p className="eyebrow">History</p>
                    <h1>Your learning journey, commit by commit</h1>
                    <p>
                        Track recent repository updates created from your workspace pushes.
                    </p>
                    <button type="button" className="btn-ghost history-refresh" onClick={loadHistory}>
                        Refresh History
                    </button>
                </article>

                {loading && (
                    <div className="timeline">
                        <article className="glass-card timeline-item">
                            <span>..</span>
                            <div>
                                <h3>Loading history</h3>
                                <p>Fetching latest commits from your configured GitHub repository.</p>
                            </div>
                        </article>
                    </div>
                )}

                {!loading && errorMessage && (
                    <div className="timeline">
                        <article className="glass-card timeline-item">
                            <span>!</span>
                            <div>
                                <h3>History unavailable</h3>
                                <p>{errorMessage}</p>
                            </div>
                        </article>
                    </div>
                )}

                {!loading && !errorMessage && historyItems.length===0 && (
                    <div className="timeline">
                        <article className="glass-card timeline-item">
                            <span>0</span>
                            <div>
                                <h3>No updates yet</h3>
                                <p>Push at least one question/answer pair from workspace to see history entries.</p>
                            </div>
                        </article>
                    </div>
                )}

                {!loading && !errorMessage && historyItems.length>0 && (
                    <div className="timeline">
                        {historyItems.map((item,index)=>(
                            <article className="glass-card timeline-item" key={item.sha}>
                                <span>{String(index+1).padStart(2,"0")}</span>
                                <div>
                                    <h3>{item.message}</h3>
                                    <p>{item.author} • {formatDate(item.date)}</p>
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
            </section>
        </div>
    );
}

export default History