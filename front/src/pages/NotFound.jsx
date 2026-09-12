import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="page-container not-found-container">
            <div className="card text-center">
                <h2>404 - Page Not Found</h2>
                <p>The page you are looking for does not exist or has been moved.</p>
                <Link to="/" className="btn btn-primary">
                    ← Return to Home
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
