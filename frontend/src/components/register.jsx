import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./login-nav";
import Footer from "./footer";
import api from "../api.js";
import toast from "react-hot-toast";
import "../css/klipsan.css";

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
        <div className="register-page page-shell klipsan-auth-page">
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
                        <p className="kl-kicker">Bootstrap Account</p>
                        <h1>Initialize your workspace identity and start shipping entries.</h1>
                        <p>
                            Register once to create your profile in MongoDB, configure GitHub targets, and keep every learning entry versioned.
                        </p>
                    </div>
                    <ul className="klipsan-auth-list">
                        <li>Unique username and secure password validation</li>
                        <li>One profile for all your repository pushes</li>
                        <li>Instant jump from auth to workspace</li>
                    </ul>
                </article>

                <form className="klipsan-auth-form" onSubmit={handleRegister}>
                    <p className="kl-kicker">Start publishing</p>
                    <h2>Register</h2>
                    <div className="klipsan-fields">
                        <input
                            className="klipsan-input"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                            required
                        />
                        <input
                            className="klipsan-input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                            required
                        />
                        <input
                            className="klipsan-input"
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            autoComplete="new-password"
                            required
                        />
                    </div>
                    <button className="klipsan-button" type="submit">Create Account</button>
                    <p className="klipsan-auth-foot">
                        Already have an account? <Link to="/login">Sign In</Link>
                    </p>
                </form>
            </section>

            <div className="footer-shell">
                <Footer />
            </div>
        </div>
    );
}

export default Register;