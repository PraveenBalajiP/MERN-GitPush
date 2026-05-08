import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./login-nav";
import Footer from "./footer";
import api from "../api.js";
import toast from "react-hot-toast";
import "../css/klipsan.css";

function Login({ theme, setTheme }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();
        try {
            const response = await api.post("/api/auth/login", { username, password });
            toast.success(response.data.message);
            navigate("/home");
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message || "Login Failed");
            } else {
                toast.error("Login Failed: " + error.message);
            }
        }
    }

    return (
        <div className="login-page page-shell klipsan-auth-page">
            <Header theme={theme} setTheme={setTheme} />

            <section className="klipsan-auth-grid">
                <article className="klipsan-auth-copy">
                    <div
                        className="klipsan-auth-visual"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80')",
                        }}
                        aria-hidden="true"
                    />
                    <div>
                        <p className="kl-kicker">Auth Session</p>
                        <h1>Authenticate, sync, and commit without leaving your flow.</h1>
                        <p>
                            Sign in to your GitPush workspace and continue publishing learning logs with a clean Git history.
                        </p>
                    </div>
                    <ul className="klipsan-auth-list">
                        <li>Session cookie auth for protected routes</li>
                        <li>Fast push flow for daily entries</li>
                        <li>Repository-ready structure by default</li>
                    </ul>
                </article>

                <form className="klipsan-auth-form" onSubmit={handleLogin}>
                    <p className="kl-kicker">Sign in</p>
                    <h2>Login</h2>
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
                            autoComplete="current-password"
                            required
                        />
                    </div>
                    <button className="klipsan-button" type="submit">Sign In</button>
                    <p className="klipsan-auth-foot">
                        New here? <Link to="/register">Create Account</Link>
                    </p>
                </form>
            </section>

            <div className="footer-shell">
                <Footer />
            </div>
        </div>
    );
}

export default Login;
