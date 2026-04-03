import { Link } from "react-router-dom";
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
                        <button className="toggle-btn"
                             onClick={swapTheme}>{theme==="light"?<i className="fa-solid fa-moon"></i>:<i className="fa-solid fa-sun"></i>}</button>
                    </div>
                </div>
                <div className="main-btn">
                    <div className="git-profile">
                        <a
                            className="git-btn"
                            href="https://github.com"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Open GitHub"
                        >
                            <i className="fa-brands fa-github"></i>
                        </a>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Header   