import { useState, useEffect } from "react";
import VantaBackground from "./components/vantaRings";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/home";
import Login from "./components/login";
import About from "./components/about";
import History from "./components/history";
import User from "./components/user";
import GitHub from "./components/github";
import "./App.css";

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
      <div className="app app-root">
        <Routes>
          <Route path="/" element={<Login theme={theme} setTheme={setTheme}/>} />
          <Route path="/home" element={
            <ProtectedRoute>
              <Home theme={theme} setTheme={setTheme}/>
            </ProtectedRoute>
          } />
          <Route path="/about" element={
            <ProtectedRoute>
              <About theme={theme} setTheme={setTheme}/>
            </ProtectedRoute>
          } />
          <Route path="/history" element={
            <ProtectedRoute>
              <History theme={theme} setTheme={setTheme}/>
            </ProtectedRoute>
          } />
          <Route path="/user" element={
            <ProtectedRoute>
              <User theme={theme} setTheme={setTheme}/>
            </ProtectedRoute>
          } />
          <Route path="/github" element={
            <ProtectedRoute>
              <GitHub theme={theme} setTheme={setTheme}/>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </>
  );
}

export default App;