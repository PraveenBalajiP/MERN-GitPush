import { useState } from "react";
import {Link} from "react-router-dom"; 
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
        <div className="main">
            <div className="header">
            <Link to="/home" className="brand-link">
                <span className="brand-mark" aria-hidden="true">GP</span>
                <span className="brand-copy">
                    <span className="brand-name">GitPush Studio</span>
                    <span className="brand-tag">GitHub sync workspace</span>
                </span>
            </Link>
            <div className="main-nav">
                <div className="nav">
                    <Link to="/home">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/history">History</Link>
                    <Link to="/user">Workspace</Link>
                </div>
            </div>
            <div className="home-btns">
                <div className="main-btn">
                    <div className="theme-toggle">
                        <button className="toggle-btn"
                             onClick={swapTheme}>{theme==="light"?<i className="fa-solid fa-moon"></i>:<i className="fa-solid fa-sun"></i>}</button>
                    </div>
                </div>
                <div className="main-btn">
                    <div className="git-profile">
                        <Link to="/github" className="git-btn" onClick={()=>setSlideMenu(false)}>
                            <i className="fa-brands fa-github"></i>
                        </Link>
                    </div>
                </div>
            </div>
            </div>
        </div>
        

    );
}

export default Header   