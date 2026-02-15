import { useState, useEffect } from "react";
import VantaBackground from "./components/vantaRings";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./components/home";
import Login from "./components/login";
import About from "./components/about";
import History from "./components/history";

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <VantaBackground theme={theme} />
      <div className="app" style={{ position: "relative", zIndex: 2 }}>
        <Routes>
          <Route path="/" element={<Login theme={theme} setTheme={setTheme}/>} />
          <Route path="/home" element={<Home theme={theme} setTheme={setTheme}/>} />
          <Route path="/about" element={<About theme={theme} setTheme={setTheme}/>} />
          <Route path="/history" element={<History theme={theme} setTheme={setTheme}/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;