import { useState, useEffect } from "react";

function Projects() {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [username, setUsername] = useState("tirth-bhatt18");

    const fetchRepositories = async (targetUser) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://api.github.com/users/${targetUser}/repos?per_page=10`);
            if (!response.ok) {
                throw new Error(`GitHub API returned status ${response.status} (${response.statusText})`);
            }
            const data = await response.json();
            setRepos(data);
        } catch (err) {
            setError(err.message || "Failed to fetch repositories.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRepositories(username);
    }, [username]);

    const handleRetry = () => {
        fetchRepositories(username);
    };

    const handleUserChange = (e) => {
        e.preventDefault();
        const inputUser = e.target.elements.githubUser.value.trim();
        if (inputUser) {
            setUsername(inputUser);
        }
    };

    const filteredRepos = repos.filter((repo) =>
        repo.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="page-container">
            <header className="page-header">
                <h2>Practical 3: GitHub Projects (External REST API)</h2>
                <p>Demonstrates <code>useEffect()</code>, <code>useState()</code>, and <code>fetch()</code> consuming GitHub API.</p>
            </header>

            <div className="card search-card">
                <form onSubmit={handleUserChange} className="inline-form">
                    <label htmlFor="githubUser">GitHub Username:</label>
                    <input
                        id="githubUser"
                        name="githubUser"
                        type="text"
                        defaultValue={username}
                        placeholder="e.g. tirth-bhatt18"
                    />
                    <button type="submit" className="btn btn-primary">Fetch Repos</button>
                </form>

                <div className="filter-input-group">
                    <label htmlFor="repoSearch">Filter Repositories:</label>
                    <input
                        id="repoSearch"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by repo name..."
                    />
                </div>
            </div>

            {loading && (
                <div className="status-box loading-box">
                    <p>⌛ Loading GitHub repositories for <strong>{username}</strong>...</p>
                </div>
            )}

            {error && (
                <div className="status-box error-box">
                    <p>❌ <strong>Error:</strong> {error}</p>
                    <button type="button" onClick={handleRetry} className="btn btn-danger">
                        🔄 Retry API Request
                    </button>
                </div>
            )}

            {!loading && !error && (
                <div className="repos-grid">
                    {filteredRepos.length > 0 ? (
                        filteredRepos.map((repo) => (
                            <div key={repo.id} className="repo-card">
                                <h3>{repo.name}</h3>
                                <p className="repo-desc">{repo.description || "No description provided."}</p>
                                <div className="repo-meta">
                                    <span className="star-badge">⭐ {repo.stargazers_count} stars</span>
                                    <a
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="repo-link"
                                    >
                                        View on GitHub ↗
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-data">No repositories match "{searchTerm}".</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Projects;
