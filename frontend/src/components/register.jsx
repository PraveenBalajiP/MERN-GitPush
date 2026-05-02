import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./login-nav";
import api from "../api.js";
import toast from "react-hot-toast";
import "../css/login.css";

function Register({ theme, setTheme }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    async function handleRegister(event) {
        event.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const response = await api.post("/api/auth/register", {
                username,
                password,
            });

            toast.success(response.data.message || "Registration Successful");
            navigate("/login");
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || "Registration Failed");
            } else {
                toast.error("Registration Failed: " + error.message);
            }
        }
    }

    return (
        <div className="register-page page-shell">
            <Header theme={theme} setTheme={setTheme} />
            <section className="register-layout content-wrap">
                <article className="glass-card register-copy">
                    <p className="eyebrow">Bootstrap Account</p>
                    <h1>Initialize your workspace identity and start shipping entries.</h1>
                    <p>
                        Register once to create your profile in MongoDB, configure GitHub targets, and keep every learning entry versioned.
                    </p>
                    <ul className="register-points">
                        <li>Unique username and secure password validation</li>
                        <li>One profile for all your repository pushes</li>
                        <li>Instant jump from auth to workspace</li>
                    </ul>
                    <div className="auth-terminal-log" aria-hidden="true">
                        <p>$ auth register --username &lt;new-user&gt;</p>
                        <p className="ok">db.insert(users): success</p>
                        <p className="hint">next: login and configure /github</p>
                    </div>
                </article>

                <form className="register glass-card" onSubmit={handleRegister}>
                    <h2>Register</h2>
                    <div className="inputs">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            autoComplete="new-password"
                            required
                        />
                    </div>
                    <div className="login-btn">
                        <button type="submit">Create Account</button>
                    </div>
                    <p className="form-footer">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>
                </form>
            </section>
        </div>
    );
}

export default Register;