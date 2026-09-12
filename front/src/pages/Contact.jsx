import { useState, useEffect } from "react";

function Contact() {
    // Load initial form draft & submitted data from localStorage to persist entries across page navigation
    const [name, setName] = useState(() => localStorage.getItem("contact_draft_name") || "");
    const [email, setEmail] = useState(() => localStorage.getItem("contact_draft_email") || "");
    const [message, setMessage] = useState(() => localStorage.getItem("contact_draft_message") || "");
    const [submittedData, setSubmittedData] = useState(() => {
        const saved = localStorage.getItem("contact_submitted_data");
        return saved ? JSON.parse(saved) : null;
    });

    // Save draft entries automatically to localStorage whenever user types
    useEffect(() => {
        localStorage.setItem("contact_draft_name", name);
        localStorage.setItem("contact_draft_email", email);
        localStorage.setItem("contact_draft_message", message);
    }, [name, email, message]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !message) return;
        const data = { name, email, message, timestamp: new Date().toLocaleString() };
        setSubmittedData(data);
        localStorage.setItem("contact_submitted_data", JSON.stringify(data));
        setName("");
        setEmail("");
        setMessage("");
        localStorage.removeItem("contact_draft_name");
        localStorage.removeItem("contact_draft_email");
        localStorage.removeItem("contact_draft_message");
    };

    const handleClearSubmitted = () => {
        setSubmittedData(null);
        localStorage.removeItem("contact_submitted_data");
    };

    return (
        <div className="page-container">
            <header className="page-header">
                <h2>Practical 2: Contact Us (Controlled Form & useState)</h2>
                <p>Demonstrates controlled components, real-time input reflection, character count, and persistent state.</p>
            </header>

            <div className="contact-grid">
                <div className="card form-card">
                    <h3>Send a Message</h3>
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">Full Name:</label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address:</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">
                                Message ({message.length} / 250 characters):
                            </label>
                            <textarea
                                id="message"
                                rows="4"
                                maxLength="250"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your message here..."
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit Form</button>
                    </form>
                </div>

                <div className="card preview-card">
                    <h3>Real-Time Controlled State Display</h3>
                    <p className="hint">Entries are automatically saved in local state across page switches:</p>

                    <div className="live-preview-box">
                        <p><strong>Name:</strong> {name || <em>(empty)</em>}</p>
                        <p><strong>Email:</strong> {email || <em>(empty)</em>}</p>
                        <p><strong>Message:</strong> {message || <em>(empty)</em>}</p>
                        <p><strong>Character Count:</strong> {message.length} / 250</p>
                    </div>

                    {submittedData && (
                        <div className="status-box success-box">
                            <div className="status-box-header">
                                <h4>✅ Last Submitted Form Data:</h4>
                                <button type="button" onClick={handleClearSubmitted} className="btn-icon" title="Clear submitted record">✕</button>
                            </div>
                            <p><strong>Name:</strong> {submittedData.name}</p>
                            <p><strong>Email:</strong> {submittedData.email}</p>
                            <p><strong>Message:</strong> {submittedData.message}</p>
                            <span className="timestamp">Submitted at: {submittedData.timestamp}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Contact;
