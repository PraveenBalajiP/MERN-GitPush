import {useEffect} from "react";
import {Link} from "react-router-dom"; 
import logo from "../assets/logo.png"
import "../css/header.css"

function Header({theme,setTheme}){

    function swapTheme(){
        if(theme==="light"){
            setTheme("dark")
            localStorage.setItem("theme","dark");
        }
        else{
            setTheme("light");
            localStorage.setItem("theme","light");
        }
    }

    return(
        <div className="header">
            <img src={logo} alt="logo" className="logo"/>
            <div className="main-nav">
                <div className="nav">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/history">History</Link>
                </div>
            </div>
            <div className="home-btns">
                <div className="main-btn">
                    <div className="theme-toggle">
                        <button className="toggle-btn"
                                onClick={swapTheme}>{theme==="light"?<i class="fa-solid fa-moon"></i>:<i class="fa-solid fa-sun"></i>}</button>
                    </div>
                </div>
                <div className="main-btn">
                    <div className="git-profile">
                        <button className="git-btn"><i className="fa-brands fa-github"></i></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header   