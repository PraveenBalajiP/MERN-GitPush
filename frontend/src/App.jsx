import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./components/landing";
import Home from "./components/home";
import Register from "./components/register";
import Login from "./components/login";
import About from "./components/about";
import History from "./components/history";
import User from "./components/user";
import GitHub from "./components/github";
import "./App.css";
import "./css/klipsan.css";

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-shell", "klipsan");
  }, []);

  return (
    <>
      <div className="app app-root">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login theme={theme} setTheme={setTheme}/>} />
          <Route path="/register" element={<Register theme={theme} setTheme={setTheme}/>} />
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