import {useState,useEffect,useRef} from "react";
import {Link} from "react-router-dom"; 
import logo from "../assets/logo.png"
import "../css/header.css"

function Header({theme,setTheme}){
    const [slideMenu,setSlideMenu]=useState(false);
    const navBtnRef=useRef();
    const sideMenuRef=useRef();

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

    useEffect(()=>{
        if(slideMenu){
            sideMenuRef.current.style.transform="translateX(0)";
        }
        else{
            sideMenuRef.current.style.transform="translateX(100%)";
        }
    },[slideMenu])

    return(
        <div className="main">
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
                             onClick={swapTheme}>{theme==="light"?<i className="fa-solid fa-moon"></i>:<i className="fa-solid fa-sun"></i>}</button>
                    </div>
                </div>
                <div className="main-btn">
                    <div className="git-profile">
                        <button className="git-btn"><i className="fa-brands fa-github"></i></button>
                    </div>
                </div>
                <div className="main-btn" ref={navBtnRef}>
                    <div className="nav-btn">
                        <button className="nav-toggle" onClick={()=>setSlideMenu(!slideMenu)}><i className="fa-solid fa-bars"></i></button>
                    </div>
                </div>
            </div>
            </div>
            <div className="slide-menu" ref={sideMenuRef}>
                <Link to="/" onClick={()=>setSlideMenu(false)}>Home</Link>
                <Link to="/about" onClick={()=>setSlideMenu(false)}>About</Link>
                <Link to="/history" onClick={()=>setSlideMenu(false)}>History</Link>
            </div>
        </div>
        

    );
}

export default Header   