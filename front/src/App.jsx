import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Tasks from "./pages/Tasks";
import NotFound from "./pages/NotFound";
import { getToken, removeToken, getMe } from "./api";
import "./App.css";

function App() {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("theme") === "dark";
    });
    const [user, setUser] = useState(null);
    const [toast, setToast] = useState(null);

    // Apply dark class directly to document body & html element for complete page theme switching
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            document.body.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            document.body.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    // Auto-dismiss Toast notifications
    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => {
                setToast(null);
            }, 3500);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    // Check user authentication status on initial app load
    useEffect(() => {
        const token = getToken();
        if (token) {
            getMe()
                .then((res) => setUser(res.user))
                .catch(() => {
                    removeToken();
                    setUser(null);
                });
        }

        const handleAuthChange = () => {
            const currentToken = getToken();
            if (!currentToken) setUser(null);
        };

        window.addEventListener("auth-change", handleAuthChange);
        return () => window.removeEventListener("auth-change", handleAuthChange);
    }, []);

    const handleLogout = () => {
        removeToken();
        setUser(null);
        setToast({ type: "success", message: "Logged out successfully." });
    };

    return (
        <div className="app-layout">
            <Navbar
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                user={user}
                onLogout={handleLogout}
            />

            <main className="main-viewport">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/tasks" element={<Tasks user={user} setUser={setUser} setToast={setToast} />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>

            <Footer />

            {toast && (
                <div className={`toast-banner toast-${toast.type}`}>
                    {toast.type === "success" ? "✅ " : "❌ "}
                    {toast.message}
                </div>
            )}
        </div>
    );
}

export default App;