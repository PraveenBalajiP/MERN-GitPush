import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Header from "./login-nav"
import api from "../api.js";
import toast from "react-hot-toast";
import "../css/login.css"

function Login({theme, setTheme}){
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();

    async function handleLogin(event){
        event.preventDefault();
        try{
            const response=await api.post("/api/auth/login",{username,password});
            toast.success(response.data.message);
            navigate("/user");
        }
        catch(error){
            if(error.response){
                toast.error(error.response.data.message || "Login Failed");
            }
            else{
                toast.error("Login Failed: "+error.message);
            }
        }
    }

    return(
        <div className="login-page page-shell">
            <Header theme={theme} setTheme={setTheme} />
            <section className="login-layout content-wrap">
                <article className="glass-card login-copy">
                    <p className="eyebrow">Auth Session</p>
                    <h1>Authenticate, sync, and commit without leaving your flow.</h1>
                    <p>
                        Sign in to your GitPush workspace and continue publishing learning logs with a clean Git history.
                    </p>
                    <ul className="login-points">
                        <li>Session cookie auth for protected routes</li>
                        <li>Fast push flow for daily entries</li>
                        <li>Repository-ready structure by default</li>
                    </ul>
                    <div className="auth-terminal-log" aria-hidden="true">
                        <p>$ auth login --user &lt;username&gt;</p>
                        <p className="ok">token created: session.active=true</p>
                        <p className="hint">next: open /user and push your notes</p>
                    </div>
                </article>

                <form className="login glass-card" onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <div className="inputs">
                        <input  type="text" 
                                placeholder="Username" 
                                value={username} 
                                onChange={(e)=>setUsername(e.target.value)}
                                autoComplete="username"
                                required/>
                        <input  type="password" 
                                placeholder="Password" 
                                value={password} 
                                onChange={(e)=>setPassword(e.target.value)}
                                autoComplete="current-password"
                                required/>
                    </div>
                    <div className="login-btn">
                        <button type="submit">Sign In</button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default Login