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
            navigate("/");
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
                    <p className="eyebrow">Create Account</p>
                    <h1>Start your GitHub sync workspace</h1>
                    <p>
                        Create an account to save your workspace settings, organize your practice entries, and push updates to GitHub.
                    </p>
                    <ul className="register-points">
                        <li>Register in a few quick steps</li>
                        <li>Keep your GitHub settings in one place</li>
                        <li>Move directly into the learning workspace</li>
                    </ul>
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
                        Already have an account? <Link to="/">Sign in</Link>
                    </p>
                </form>
            </section>
        </div>
    );
}

export default Register;