import {useEffect} from "react";
import axios from "axios";

function Login(){
    useEffect(()=>{

    })

    return(
        <div className="login">
            <h1>Login Page</h1>
            <div className="inputs">
                <input type="text" placeholder="Username"/>
                <input type="password" placeholder="Password"/>
            </div>
            <div className="login-btn">
                <button className="login-btn">Login</button>
            </div>
        </div>
    );
}

export default Login