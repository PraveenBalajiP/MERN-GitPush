import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "./header";
import "../css/user.css";

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

            const response = await axios.post(
                "http://localhost:5000/api/github/push",
                payload,
                { withCredentials: true }
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

    const activeTextEntry = multipleTextEntries[activeTextIndex] || { name: "", content: "" };

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
                        <p className="mode-title">Entry Type</p>
                        <div className="entry-mode-group">
                            <label className="entry-mode-option">
                                <input
                                    type="radio"
                                    name="entryMode"
                                    value="qa"
                                    checked={entryMode === "qa"}
                                    onChange={() => handleEntryModeChange("qa")}
                                />
                                Question + Answer
                            </label>
                            <label className="entry-mode-option">
                                <input
                                    type="radio"
                                    name="entryMode"
                                    value="multiple"
                                    checked={entryMode === "multiple"}
                                    onChange={() => handleEntryModeChange("multiple")}
                                />
                                Multiple Entries
                            </label>
                        </div>
                    </div>

                    {entryMode === "qa" && <>
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
                    </>}

                    {entryMode === "multiple" && (
                        <div className="qa-field">
                            <div className="multi-text-top">
                                <p className="mode-title">Multiple Text Entries</p>
                                <div className="text-actions">
                                    <button type="button" className="text-add-btn" onClick={addMultipleTextEntry}><i className="fas fa-plus"></i>Add Text File</button>
                                    <button type="button" className="text-delete-btn" onClick={deleteActiveTextEntry}><i className="fas fa-trash"></i>Delete Text File</button>
                                </div>
                            </div>

                            <div className="text-switcher" role="tablist" aria-label="Text entry selector">
                                {multipleTextEntries.map((entry, index) => (
                                    <button
                                        key={`${entry.name}-${index}`}
                                        type="button"
                                        className={`text-switch-btn ${index === activeTextIndex ? "active" : ""}`}
                                        onClick={() => setActiveTextIndex(index)}
                                        role="tab"
                                        aria-selected={index === activeTextIndex}
                                    >
                                        {`Text ${index + 1}`}
                                    </button>
                                ))}
                            </div>
                            <span className="file-meta">Text {activeTextIndex + 1} of {multipleTextEntries.length}</span>

                            <label htmlFor="multiTextName">Text File Name</label>
                            <input
                                id="multiTextName"
                                type="text"
                                value={activeTextEntry.name}
                                onChange={(e) => updateActiveTextEntry("name", e.target.value)}
                                placeholder="example: notes-day-12.txt"
                            />

                            <label htmlFor="multiTextContent">Text Content</label>
                            <textarea
                                id="multiTextContent"
                                value={activeTextEntry.content}
                                onChange={(e) => updateActiveTextEntry("content", e.target.value)}
                                placeholder="Write content for selected text entry"
                            />

                            <label className="file-upload" htmlFor="multipleFiles">Upload multiple files</label>
                            <input
                                id="multipleFiles"
                                ref={multipleFilesRef}
                                className="file-input"
                                type="file"
                                multiple
                                onChange={(e) => setMultipleFiles(Array.from(e.target.files || []))}
                            />
                            <span className="file-meta">{multipleFiles.length > 0 ? `${multipleFiles.length} file(s) selected` : "No files selected"}</span>
                            {multipleFiles.length > 0 && (
                                <ul className="file-list">
                                    {multipleFiles.map((file) => (
                                        <li key={`${file.name}-${file.lastModified}`}>{file.name}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}

                    <div className="user-actions">
                        <button type="submit" disabled={isPushing}>{isPushing ? "Pushing..." : "Push to GitHub"}</button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default User;