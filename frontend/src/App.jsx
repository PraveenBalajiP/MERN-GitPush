import {useState,useEffect} from "react";
import {Routes,Route} from "react-router-dom";
import Header from "./components/header"; 

function App(){
    const [theme,setTheme]=useState(localStorage.getItem("theme") || "light");

    useEffect(()=>{
        document.documentElement.setAttribute("data-theme",theme);
    },[theme])

    return(
    <div className="app">
        <Header theme={theme} setTheme={setTheme}/>
        {/*
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/history" element={<History/>}/>
            </Routes>
        */}
    </div>
    )
}

export default App