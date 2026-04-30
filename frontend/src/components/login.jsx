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
                    <p className="eyebrow">Welcome Back</p>
                    <h1>Continue where your learning left off</h1>
                    <p>
                        Sign in to access your workspace, push your latest answers, and keep your GitHub notes in sync.
                    </p>
                    <ul className="login-points">
                        <li>Secure session-based authentication</li>
                        <li>One-click push to repository</li>
                        <li>Simple flow for daily practice</li>
                    </ul>
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