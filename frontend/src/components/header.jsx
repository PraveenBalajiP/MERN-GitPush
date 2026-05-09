import { useEffect, useState } from "react";
import {Link} from "react-router-dom"; 
import api from "../api.js";
import toast from "react-hot-toast";
import "../css/header.css"

function Header({theme,setTheme}){
    const [menuOpen,setMenuOpen]=useState(false);

    useEffect(()=>{
        function handleResize(){
            if(window.innerWidth>920){
                setMenuOpen(false);
            }
        }

        window.addEventListener("resize",handleResize);
        return ()=>window.removeEventListener("resize",handleResize);
    },[]);

    function swapTheme(){
        setTheme((prev) => {
            const next = prev === "light" ? "dark" : "light";
            try{
                document.documentElement.setAttribute("data-theme", next);
                localStorage.setItem("theme", next);
            }catch(e){}
            return next;
        });
    }

    function closeMenu(){
        setMenuOpen(false);
    }

    async function openGitHub(event){
        event?.preventDefault();
        event?.stopPropagation();
        const fallbackUrl="https://github.com";
        const popup=window.open(fallbackUrl,"_blank");
        try{
            const response=await api.get("/api/auth/github-url");
            if(response.data.url){
                if(popup){
                    popup.location.href=response.data.url;
                }
                else{
                    window.open(response.data.url,"_blank");
                }
            }
            else{
                toast.error("Unable to get your GitHub profile. Opening GitHub home.");
            }
        }
        catch(error){
            const status=error?.response?.status;

            if(status===401){
                toast.error("Please log in to open your profile. Opening GitHub home.");
                return;
            }
            if(status===400){
                toast.error("GitHub username is not configured. Opening GitHub home.");
                return;
            }
            toast.error("Error fetching GitHub profile URL");
        }
    }

    return(
        <div className="main">
            <div className="header">
            <Link to="/home" className="brand-link" onClick={closeMenu}>
                <span className="brand-mark" aria-hidden="true">GP</span>
                <span className="brand-copy">
                    <span className="brand-name">GitPush Studio</span>
                    <span className="brand-tag">GitHub sync workspace</span>
                </span>
            </Link>
            <div className="main-nav">
                <div className="nav">
                    <Link to="/home" onClick={closeMenu}>Home</Link>
                    <Link to="/about" onClick={closeMenu}>About</Link>
                    <Link to="/history" onClick={closeMenu}>History</Link>
                    <Link to="/user" onClick={closeMenu}>Workspace</Link>
                </div>
            </div>
            <button
                type="button"
                className={`nav-toggle ${menuOpen?"open":""}`}
                onClick={()=>setMenuOpen((prev)=>!prev)}
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
            >
                <i className={menuOpen?"fa-solid fa-xmark":"fa-solid fa-bars"}></i>
            </button>
            <div className="home-btns">
                <div className="main-btn">
                    <div className="theme-toggle">
                        <button type="button" className="toggle-btn"
                             onClick={swapTheme}>{theme==="light"?<i className="fa-solid fa-moon"></i>:<i className="fa-solid fa-sun"></i>}</button>
                    </div>
                </div>
                <div className="main-btn">
                    <button type="button" className="git-btn" onClick={openGitHub} aria-label="Open GitHub profile">
                        <i className="fa-brands fa-github"></i>    
                    </button>
                </div>
            </div>
            </div>
            <div className={`mobile-nav ${menuOpen?"open":""}`}>
                <div className="nav">
                    <Link to="/home" onClick={closeMenu}>Home</Link>
                    <Link to="/about" onClick={closeMenu}>About</Link>
                    <Link to="/history" onClick={closeMenu}>History</Link>
                    <Link to="/user" onClick={closeMenu}>Workspace</Link>
                </div>
            </div>
        </div>
    );
}

export default Header   