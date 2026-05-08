import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";
import toast from "react-hot-toast";
import Header from "./header";
import Footer from "./footer";
import "../css/klipsan.css";

function User({ theme, setTheme }) {
    const [entryMode, setEntryMode] = useState("qa");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [questionFile, setQuestionFile] = useState(null);
    const [answerFile, setAnswerFile] = useState(null);
    const [multipleFiles, setMultipleFiles] = useState([]);
    const [multipleTextEntries, setMultipleTextEntries] = useState([{ name: "text-1.txt", content: "" }]);
    const [activeTextIndex, setActiveTextIndex] = useState(0);
    const [commitMessage, setCommitMessage] = useState("");
    const [entryFolderName, setEntryFolderName] = useState("");
    const [isPushing, setIsPushing] = useState(false);
    const questionFileRef = useRef(null);
    const answerFileRef = useRef(null);
    const multipleFilesRef = useRef(null);
    const navigate = useNavigate();

    function resetModeFields() {
        setQuestion("");
        setAnswer("");
        setQuestionFile(null);
        setAnswerFile(null);
        setMultipleFiles([]);
        setMultipleTextEntries([{ name: "text-1.txt", content: "" }]);
        setActiveTextIndex(0);
        if (questionFileRef.current) {
            questionFileRef.current.value = "";
        }
        if (answerFileRef.current) {
            answerFileRef.current.value = "";
        }
        if (multipleFilesRef.current) {
            multipleFilesRef.current.value = "";
        }
    }

    function handleEntryModeChange(nextMode) {
        setEntryMode(nextMode);
        resetModeFields();
    }

    async function pushToGithub(event) {
        event.preventDefault();
        if (entryMode === "qa") {
            const hasQuestionInput = Boolean(question.trim() || questionFile);
            const hasAnswerInput = Boolean(answer.trim() || answerFile);
            if (!hasQuestionInput || !hasAnswerInput) {
                toast.error("Provide question and answer as text or files");
                return;
            }
        }
        const hasMultipleTextInput = multipleTextEntries.some((entry) => entry.content.trim());
        if (entryMode === "multiple" && multipleFiles.length === 0 && !hasMultipleTextInput) {
            toast.error("Provide multiple inputs as texts, files, or both");
            return;
        }

        try {
            setIsPushing(true);
            const payload = new FormData();
            payload.append("entryMode", entryMode);
            payload.append("question", question.trim());
            payload.append("answer", answer.trim());
            payload.append("commitMessage", commitMessage.trim());
            payload.append("entryFolderName", entryFolderName.trim());
            payload.append("multipleTexts", JSON.stringify(multipleTextEntries));

            if (questionFile) {
                payload.append("questionFile", questionFile);
            }
            if (answerFile) {
                payload.append("answerFile", answerFile);
            }
            multipleFiles.forEach((file) => {
                payload.append("multiFiles", file);
            });

            const response = await api.post(
                "/api/github/push",
                payload
            );

            toast.success(response.data.message || "Pushed successfully");
            setCommitMessage("");
            setEntryFolderName("");
            resetModeFields();
        } catch (error) {
            toast.error(error.response?.data?.message || "Push failed");
        } finally {
            setIsPushing(false);
        }
    }

    function addMultipleTextEntry() {
        const nextEntries = [...multipleTextEntries, { name: `text-${multipleTextEntries.length + 1}.txt`, content: "" }];
        setMultipleTextEntries(nextEntries);
        setActiveTextIndex(nextEntries.length - 1);
    }

    function deleteActiveTextEntry() {
        if (multipleTextEntries.length === 1) {
            setMultipleTextEntries([{ name: "text-1.txt", content: "" }]);
            setActiveTextIndex(0);
            return;
        }

        const nextEntries = multipleTextEntries.filter((_, index) => index !== activeTextIndex);
        setMultipleTextEntries(nextEntries);
        setActiveTextIndex((prev) => Math.max(0, Math.min(prev, nextEntries.length - 1)));
    }

    function updateActiveTextEntry(field, value) {
        setMultipleTextEntries((prev) => prev.map((entry, index) => {
            if (index !== activeTextIndex) {
                return entry;
            }
            return { ...entry, [field]: value };
        }));
    }

    function removeMultipleFile(indexToRemove) {
        setMultipleFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
    }

    const activeTextEntry = multipleTextEntries[activeTextIndex] || { name: "", content: "" };

    return (
        <div className="user-page page-shell klipsan-auth-page">
            <Header theme={theme} setTheme={setTheme} />

            <section className="klipsan-auth-grid">
                <article className="klipsan-auth-copy">
                    <div
                        className="klipsan-auth-visual"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80')",
                        }}
                        aria-hidden="true"
                    />
                    <div>
                        <p className="kl-kicker">Workspace</p>
                        <h1>User Workspace</h1>
                        <p>Write your question and answer, upload files, then push directly to your configured GitHub repository.</p>
                    </div>
                    <ul className="klipsan-auth-list">
                        <li>Question + answer workflow</li>
                        <li>Multiple file attachments</li>
                        <li>Instant GitHub synchronization</li>
                    </ul>
                    <button
                        type="button"
                        className="klipsan-button ghost"
                        style={{ marginTop: "auto", width: "fit-content" }}
                        onClick={() => navigate("/github")}
                    >
                        Open GitHub Settings
                    </button>
                </article>

                <form className="klipsan-auth-form" onSubmit={pushToGithub} style={{ justifyContent: "flex-start" }}>
                    <p className="kl-kicker">Draft entry</p>
                    <h2 style={{ marginBottom: "0.5rem" }}>User Workspace</h2>

                    <div className="klipsan-fields">
                        <input
                            id="commitMessage"
                            className="klipsan-input"
                            type="text"
                            value={commitMessage}
                            onChange={(e) => setCommitMessage(e.target.value)}
                            placeholder="Enter Commit Message"
                        />
                        <input
                            id="entryFolderName"
                            className="klipsan-input"
                            type="text"
                            value={entryFolderName}
                            onChange={(e) => setEntryFolderName(e.target.value)}
                            placeholder="Enter Folder Name"
                        />
                    </div>

                    <div className="workspace-mode-row">
                        <label className={`workspace-mode-btn ${entryMode === 'qa' ? 'active' : ''}`}>
                                <input
                                    type="radio"
                                    name="entryMode"
                                    value="qa"
                                    checked={entryMode === "qa"}
                                    onChange={() => handleEntryModeChange("qa")}
                                    className="workspace-mode-input"
                                />
                                Question + Answer
                            </label>
                            <label className={`workspace-mode-btn ${entryMode === 'multiple' ? 'active' : ''}`}>
                                <input
                                    type="radio"
                                    name="entryMode"
                                    value="multiple"
                                    checked={entryMode === "multiple"}
                                    onChange={() => handleEntryModeChange("multiple")}
                                    className="workspace-mode-input"
                                />
                                Multiple Entries
                            </label>
                    </div>

                    {entryMode === "qa" && <div className="klipsan-fields">
                        <textarea
                            className="klipsan-input"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Type the question here"
                            style={{ minHeight: '130px', resize: 'vertical' }}
                        />
                        <div className="workspace-upload-row">
                            <label className="workspace-upload-btn" htmlFor="questionFile">
                                Upload question file
                            </label>
                            <input
                                id="questionFile"
                                ref={questionFileRef}
                                type="file"
                                accept=".txt,.md,.json,.csv"
                                style={{ display: 'none' }}
                                onChange={(e) => setQuestionFile(e.target.files?.[0] || null)}
                            />
                            <span className="workspace-upload-meta">{questionFile ? `Selected: ${questionFile.name}` : "No file selected"}</span>
                        </div>

                        <textarea
                            className="klipsan-input"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Type the answer here"
                            style={{ minHeight: '130px', resize: 'vertical' }}
                        />
                        <div className="workspace-upload-row">
                            <label className="workspace-upload-btn" htmlFor="answerFile">
                                Upload answer file
                            </label>
                            <input
                                id="answerFile"
                                ref={answerFileRef}
                                type="file"
                                accept=".txt,.md,.json,.csv"
                                style={{ display: 'none' }}
                                onChange={(e) => setAnswerFile(e.target.files?.[0] || null)}
                            />
                            <span className="workspace-upload-meta">{answerFile ? `Selected: ${answerFile.name}` : "No file selected"}</span>
                        </div>
                    </div>}

                    {entryMode === "multiple" && (
                        <div className="klipsan-fields workspace-multi-panel">
                            <div className="workspace-tab-row">
                                {multipleTextEntries.map((entry, index) => (
                                    <button
                                        key={`tab-${index}`}
                                        type="button"
                                        className={`workspace-tab-btn ${index === activeTextIndex ? 'active' : ''}`}
                                        onClick={() => setActiveTextIndex(index)}
                                    >
                                        Text {index + 1}
                                    </button>
                                ))}
                            </div>

                            <input
                                className="klipsan-input"
                                type="text"
                                value={activeTextEntry.name}
                                onChange={(e) => updateActiveTextEntry("name", e.target.value)}
                                placeholder="example: notes-day-12.txt"
                            />

                            <textarea
                                className="klipsan-input"
                                value={activeTextEntry.content}
                                onChange={(e) => updateActiveTextEntry("content", e.target.value)}
                                placeholder="Write content for selected text entry"
                                style={{ minHeight: '130px', resize: 'vertical' }}
                            />

                            <div className="workspace-file-actions">
                                <button type="button" className="workspace-action-btn" onClick={addMultipleTextEntry}>
                                   + Add Text File
                                </button>
                                <button type="button" className="workspace-action-btn danger" onClick={deleteActiveTextEntry}>
                                   Delete Text File
                                </button>
                            </div>

                            <div className="workspace-upload-row">
                                <label className="workspace-upload-btn" htmlFor="multipleFiles">
                                    Upload multiple files
                                </label>
                                <input
                                    id="multipleFiles"
                                    ref={multipleFilesRef}
                                    type="file"
                                    multiple
                                    style={{ display: 'none' }}
                                    onChange={(e) => setMultipleFiles(Array.from(e.target.files || []))}
                                />
                                <span className="workspace-upload-meta">
                                    {multipleFiles.length > 0 ? `${multipleFiles.length} file(s) selected` : "No files selected"}
                                </span>
                            </div>

                            {multipleFiles.length > 0 && (
                                <ul className="workspace-file-list">
                                    {multipleFiles.map((file, index) => (
                                        <li key={`${file.name}-${file.lastModified}`} className="workspace-file-item">
                                            <span>{file.name}</span>
                                            <button
                                                type="button"
                                                className="workspace-remove-btn"
                                                onClick={() => removeMultipleFile(index)}
                                                aria-label={`Remove ${file.name}`}
                                            >
                                                Remove
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}

                    <button className="klipsan-button" style={{ marginTop: '1.5rem', minHeight: '3.5rem' }} type="submit" disabled={isPushing}>
                        {isPushing ? "Pushing..." : "Push to GitHub"}
                    </button>
                    <p className="klipsan-auth-foot" style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
                        Ready to ship? Ensure remote is synced.
                    </p>
                </form>
            </section>

            <div className="footer-shell">
                <Footer />
            </div>
        </div>
    );
}

export default User;