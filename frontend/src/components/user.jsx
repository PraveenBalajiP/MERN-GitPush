import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "./header";
import "../css/user.css";

function User({ theme, setTheme }) {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [isPushing, setIsPushing] = useState(false);
    const navigate = useNavigate();

    async function pushToGithub(event) {
        event.preventDefault();
        if (!question.trim() || !answer.trim()) {
            toast.error("Please fill both question and answer");
            return;
        }

        try {
            setIsPushing(true);
            const response = await axios.post(
                "http://localhost:5000/api/github/push",
                { question, answer },
                { withCredentials: true }
            );

            toast.success(response.data.message || "Pushed successfully");
            setQuestion("");
            setAnswer("");
        } catch (error) {
            toast.error(error.response?.data?.message || "Push failed");
        } finally {
            setIsPushing(false);
        }
    }

    return (
        <div className="user-page page-shell">
            <Header theme={theme} setTheme={setTheme} />

            <section className="content-wrap">
                <form className="user-card glass-card" onSubmit={pushToGithub}>
                    <p className="eyebrow">Workspace</p>
                    <h1>User Workspace</h1>
                    <p>Write your question and answer, then push directly to your configured GitHub repository.</p>

                    <div className="qa-field">
                        <label htmlFor="question">Question</label>
                        <textarea
                            id="question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Type the question here"
                        />
                    </div>

                    <div className="qa-field">
                        <label htmlFor="answer">Answer</label>
                        <textarea
                            id="answer"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Type the answer here"
                        />
                    </div>

                    <div className="user-actions">
                        <button type="submit" disabled={isPushing}>{isPushing ? "Pushing..." : "Push to GitHub"}</button>
                        <button type="button" className="secondary" onClick={() => navigate("/github")}>Open GitHub Settings</button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default User;