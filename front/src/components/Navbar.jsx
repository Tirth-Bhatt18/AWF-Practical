import { NavLink } from "react-router-dom";

function Navbar({ darkMode, setDarkMode, user, onLogout }) {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-brand">
                    <NavLink to="/">ITUE301 Portfolio</NavLink>
                </div>
                <div className="nav-links">
                    <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                        Home
                    </NavLink>
                    <NavLink to="/projects" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                        Projects
                    </NavLink>
                    <NavLink to="/contact" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                        Contact
                    </NavLink>
                    <NavLink to="/tasks" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                        Tasks API
                    </NavLink>
                </div>
                <div className="nav-actions">
                    <button
                        type="button"
                        onClick={() => setDarkMode(!darkMode)}
                        className="theme-toggle-btn"
                        title="Toggle Dark / Light Theme"
                    >
                        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
                    </button>
                    {user ? (
                        <div className="user-badge">
                            <span className="user-name">👤 {user.name}</span>
                            <button type="button" onClick={onLogout} className="btn-logout">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <NavLink to="/tasks" className="login-link">
                            Login
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
