import { useState } from "react";
import Header from "../components/Header";
import About from "../components/About";
import Skills from "../components/Skills";

function Home() {
    // Practical 2 requirement 1: useState for UI visibility toggle
    const [showBioDetails, setShowBioDetails] = useState(false);

    const skills = [
        "React",
        "JavaScript (ES6+)",
        "Node.js",
        "Express.js",
        "MongoDB & Mongoose",
        "JWT Authentication",
        "REST API Architecture",
        "HTML5 & CSS3"
    ];

    return (
        <div className="page-container">
            {/* Practical 1 reusable Header receiving props */}
            <Header name="Tirth Bhatt" />

            <main className="main-content">
                {/* Practical 1 reusable About component */}
                <About />

                {/* Practical 2 useState UI Visibility Toggle */}
                <div className="card toggle-card">
                    <div className="toggle-header">
                        <h3>Practical 2 UI Toggle Demo</h3>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setShowBioDetails(!showBioDetails)}
                        >
                            {showBioDetails ? "Hide Academic Details" : "Show Academic Details"}
                        </button>
                    </div>

                    {showBioDetails && (
                        <div className="toggle-content">
                            <p><strong>Degree:</strong> B.Tech Computer Engineering</p>
                            <p><strong>Subject:</strong> ITUE301 Advanced Web Development Frameworks</p>
                            <p><strong>Term:</strong> ODD Semester 2026-27</p>
                            <p><strong>Status:</strong> Practicals 1–7 Incremental Implementation Complete</p>
                        </div>
                    )}
                </div>

                {/* Practical 1 reusable Skills component receiving props and mapping array */}
                <Skills skillList={skills} />
            </main>
        </div>
    );
}

export default Home;
