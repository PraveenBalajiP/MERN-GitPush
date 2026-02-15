import { useState, useEffect } from "react";
import VantaBackground from "./components/VantaRings";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header";

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
        <Header theme={theme} setTheme={setTheme} />
        {/*
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/history" element={<History />} />
        </Routes>
        */}
      </div>
    </>
  );
}

export default App;