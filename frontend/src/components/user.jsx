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
                            placeholder="example: Add day-12 question and answer"
                        />
                        <input
                            id="entryFolderName"
                            className="klipsan-input"
                            type="text"
                            value={entryFolderName}
                            onChange={(e) => setEntryFolderName(e.target.value)}
                            placeholder="example: arrays-day-12"
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem', marginBottom: '1rem', borderTop: '1px solid rgba(255,255,255,0.14)', paddingTop: '1.25rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1.25rem', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.22)', background: entryMode === 'qa' ? 'linear-gradient(135deg, var(--accent-strong), var(--accent))' : 'rgba(255,255,255,0.4)', color: entryMode === 'qa' ? '#ffffff' : 'var(--text-primary)', fontFamily: 'var(--font-code)', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: entryMode === 'qa' ? 'var(--glass-shadow)' : 'none' }}>
                                <input
                                    type="radio"
                                    name="entryMode"
                                    value="qa"
                                    checked={entryMode === "qa"}
                                    onChange={() => handleEntryModeChange("qa")}
                                    style={{ margin: 0, accentColor: "currentColor", display: 'none' }}
                                />
                                Question + Answer
                            </label>
                            <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1.25rem', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.22)', background: entryMode === 'multiple' ? 'linear-gradient(135deg, var(--accent-strong), var(--accent))' : 'rgba(255,255,255,0.4)', color: entryMode === 'multiple' ? '#ffffff' : 'var(--text-primary)', fontFamily: 'var(--font-code)', fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: entryMode === 'multiple' ? 'var(--glass-shadow)' : 'none' }}>
                                <input
                                    type="radio"
                                    name="entryMode"
                                    value="multiple"
                                    checked={entryMode === "multiple"}
                                    onChange={() => handleEntryModeChange("multiple")}
                                    style={{ margin: 0, accentColor: "currentColor", display: 'none' }}
                                />
                                Multiple Entries
                            </label>
                        </div>
                    </div>

                    {entryMode === "qa" && <div className="klipsan-fields">
                        <textarea
                            className="klipsan-input"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Type the question here"
                            style={{ minHeight: '130px', resize: 'vertical' }}
                        />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <label style={{ display: 'inline-flex', alignItems: 'center', padding: '0.5rem 1.1rem', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '999px', fontFamily: 'var(--font-code)', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', background: 'rgba(255,255,255,0.3)', cursor: 'pointer', color: 'var(--text-secondary)' }} htmlFor="questionFile">
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
                            <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.75rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>{questionFile ? `Selected: ${questionFile.name}` : "No file selected"}</span>
                        </div>

                        <textarea
                            className="klipsan-input"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Type the answer here"
                            style={{ minHeight: '130px', resize: 'vertical' }}
                        />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <label style={{ display: 'inline-flex', alignItems: 'center', padding: '0.5rem 1.1rem', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '999px', fontFamily: 'var(--font-code)', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', background: 'rgba(255,255,255,0.3)', cursor: 'pointer', color: 'var(--text-secondary)' }} htmlFor="answerFile">
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
                            <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.75rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>{answerFile ? `Selected: ${answerFile.name}` : "No file selected"}</span>
                        </div>
                    </div>}

                    {entryMode === "multiple" && (
                        <div className="klipsan-fields" style={{ background: 'rgba(255,255,255,0.2)', padding: '1.25rem', borderRadius: 'calc(var(--border-radius) - 8px)', border: '1px solid rgba(255,255,255,0.12)' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.14)', marginBottom: '0.5rem' }}>
                                {multipleTextEntries.map((entry, index) => (
                                    <button
                                        key={`tab-${index}`}
                                        type="button"
                                        style={{ padding: '0.5rem 1rem', whiteSpace: 'nowrap', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.14)', background: index === activeTextIndex ? 'var(--text-primary)' : 'rgba(255,255,255,0.5)', color: index === activeTextIndex ? 'var(--text-inverse)' : 'var(--text-primary)', fontFamily: 'var(--font-code)', fontSize: '0.8rem', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase' }}
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

                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
                                <button type="button" onClick={addMultipleTextEntry} style={{ flex: 1, padding: '0.6rem', borderRadius: '999px', background: 'rgba(255,255,255,0.08)', border: 'none', fontFamily: 'var(--font-code)', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', cursor: 'pointer', color: 'var(--text-primary)' }}>
                                   + Add Text File
                                </button>
                                <button type="button" onClick={deleteActiveTextEntry} style={{ flex: 1, padding: '0.6rem', borderRadius: '999px', background: 'rgba(255,255,255,0.08)', border: 'none', fontFamily: 'var(--font-code)', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', cursor: 'pointer', color: 'var(--danger)' }}>
                                   Delete Text File
                                </button>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.14)', paddingTop: '1.25rem' }}>
                                <label style={{ display: 'inline-flex', alignItems: 'center', padding: '0.6rem 1.1rem', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '999px', fontFamily: 'var(--font-code)', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', background: 'rgba(255,255,255,0.4)', cursor: 'pointer', color: 'var(--text-primary)' }} htmlFor="multipleFiles">
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
                                <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>
                                    {multipleFiles.length > 0 ? `${multipleFiles.length} file(s) selected` : "No files selected"}
                                </span>
                            </div>
                            
                            {multipleFiles.length > 0 && (
                                <ul style={{ margin: '0.75rem 0 0', paddingLeft: '1.5rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-code)', fontSize: '0.75rem', display: 'grid', gap: '0.25rem' }}>
                                    {multipleFiles.map((file) => (
                                        <li key={`${file.name}-${file.lastModified}`}>{file.name}</li>
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