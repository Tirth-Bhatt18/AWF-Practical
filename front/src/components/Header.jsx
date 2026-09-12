function Header({ name }) {
    return (
        <header className="hero-header card">
            <div className="hero-content">
                <span className="hero-badge">Cybersecurity & Full-Stack Developer</span>
                <h1 className="hero-title">{name}</h1>
                <p className="hero-subtitle">
                    ITUE301 Advanced Web Development Frameworks Practical Portfolio
                </p>
            </div>
        </header>
    );
}

export default Header;