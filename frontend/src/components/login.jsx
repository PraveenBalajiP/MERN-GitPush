import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Header from "./login-nav"
import axios from "axios";
import toast from "react-hot-toast";
import "../css/login.css"

function Login({theme, setTheme}){
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    async function handleLogin(event){
        event.preventDefault();
        try{
            const response=await axios.post("http://localhost:5000/api/auth/login",{username,password});
            toast.success(response.data.message);
            window.location.href="/home";
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
        <div className="login-page">
            <Header theme={theme} setTheme={setTheme} />
            <div className="login">
            <h1>Login Page</h1>
            <div className="inputs">
                <input  type="text" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e)=>setUsername(e.target.value)}/>
                <input  type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className="login-btn">
                <button className="login-btn"
                        onClick={(event)=>{handleLogin(event)}}>Login</button>
            </div>
        </div>
    </div>
    );
}

export default Login