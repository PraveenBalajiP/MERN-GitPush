import {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../css/login.css"

function Login(){
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");

    async function handleLogin(event){
        event.preventDefault();
        try{
            const response=await axios.post("http://localhost:5000/api/auth/login",{username,password});
            toast.success(response.data.message);
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
    );
}

export default Login