import { Link } from "react-router-dom";
import api from "../api.js";
import toast from "react-hot-toast";
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

    async function openGitHub(event){
        event?.preventDefault();
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
                toast.error("Unable to get your GitHub profile. Opening GitHub home instead.");
            }
        }
        catch(error){
            toast.error("Error fetching GitHub profile URL. Opening GitHub home instead.");
        }
    }

    return(
        <div className="main">
            <div className="header">
            <Link to="/" className="brand-link">
                <span className="brand-mark" aria-hidden="true">GP</span>
                <span className="brand-copy">
                    <span className="brand-name">GitPush Studio</span>
                    <span className="brand-tag">GitHub sync workspace</span>
                </span>
            </Link>
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
        </div>
    );
}

export default Header   