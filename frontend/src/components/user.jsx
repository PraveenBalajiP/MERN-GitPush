import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "./header";
import "../css/user.css";

function User({ theme, setTheme }) {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [questionFile, setQuestionFile] = useState(null);
    const [answerFile, setAnswerFile] = useState(null);
    const [commitMessage, setCommitMessage] = useState("");
    const [entryFolderName, setEntryFolderName] = useState("");
    const [isPushing, setIsPushing] = useState(false);
    const questionFileRef = useRef(null);
    const answerFileRef = useRef(null);
    const navigate = useNavigate();

    async function pushToGithub(event) {
        event.preventDefault();
        const hasQuestionInput = Boolean(question.trim() || questionFile);
        const hasAnswerInput = Boolean(answer.trim() || answerFile);
        if (!hasQuestionInput || !hasAnswerInput) {
            toast.error("Provide question and answer as text or files");
            return;
        }

        try {
            setIsPushing(true);
            const payload = new FormData();
            payload.append("question", question.trim());
            payload.append("answer", answer.trim());
            payload.append("commitMessage", commitMessage.trim());
            payload.append("entryFolderName", entryFolderName.trim());

            if (questionFile) {
                payload.append("questionFile", questionFile);
            }
            if (answerFile) {
                payload.append("answerFile", answerFile);
            }

            const response = await axios.post(
                "http://localhost:5000/api/github/push",
                payload,
                { withCredentials: true }
            );

            toast.success(response.data.message || "Pushed successfully");
            setQuestion("");
            setAnswer("");
            setCommitMessage("");
            setEntryFolderName("");
            setQuestionFile(null);
            setAnswerFile(null);
            if (questionFileRef.current) {
                questionFileRef.current.value = "";
            }
            if (answerFileRef.current) {
                answerFileRef.current.value = "";
            }
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
                    <div className="header-1">
                        <div className="header-1-1">
                            <p className="eyebrow">Workspace</p>
                            <h1>User Workspace</h1>
                            <p>Write your question and answer, upload files, then push directly to your configured GitHub repository.</p>
                        </div>
                        <button type="button" className="secondary open-settings-btn" onClick={() => navigate("/github")}>Open GitHub Settings</button>
                    </div>
                    <div className="qa-field">
                        <label htmlFor="commitMessage">Commit Message (optional)</label>
                        <input
                            id="commitMessage"
                            type="text"
                            value={commitMessage}
                            onChange={(e) => setCommitMessage(e.target.value)}
                            placeholder="example: Add day-12 question and answer"
                        />
                    </div>

                    <div className="qa-field">
                        <label htmlFor="entryFolderName">Enter Folder Name (optional)</label>
                        <input
                            id="entryFolderName"
                            type="text"
                            value={entryFolderName}
                            onChange={(e) => setEntryFolderName(e.target.value)}
                            placeholder="example: arrays-day-12"
                        />
                    </div>

                    <div className="qa-field">
                        <label htmlFor="question">Question</label>
                        <textarea
                            id="question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Type the question here"
                        />
                        <label className="file-upload" htmlFor="questionFile">Upload question file</label>
                        <input
                            id="questionFile"
                            ref={questionFileRef}
                            className="file-input"
                            type="file"
                            accept=".txt,.md,.json,.csv"
                            onChange={(e) => setQuestionFile(e.target.files?.[0] || null)}
                        />
                        <span className="file-meta">{questionFile ? `Selected: ${questionFile.name}` : "No file selected"}</span>
                    </div>

                    <div className="qa-field">
                        <label htmlFor="answer">Answer</label>
                        <textarea
                            id="answer"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Type the answer here"
                        />
                        <label className="file-upload" htmlFor="answerFile">Upload answer file</label>
                        <input
                            id="answerFile"
                            ref={answerFileRef}
                            className="file-input"
                            type="file"
                            accept=".txt,.md,.json,.csv"
                            onChange={(e) => setAnswerFile(e.target.files?.[0] || null)}
                        />
                        <span className="file-meta">{answerFile ? `Selected: ${answerFile.name}` : "No file selected"}</span>
                    </div>

                    <div className="user-actions">
                        <button type="submit" disabled={isPushing}>{isPushing ? "Pushing..." : "Push to GitHub"}</button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default User;