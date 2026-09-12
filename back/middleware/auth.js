const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            error: "Unauthorized",
            message: "No token provided or invalid format. Please log in."
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const secret = process.env.JWT_SECRET || "fallback_secret";
        const decoded = jwt.verify(token, secret);
        req.user = decoded; // Contains user ID: { id: "..." }
        next();
    } catch (err) {
        return res.status(401).json({
            error: "Unauthorized",
            message: "Token is invalid or expired. Please log in again."
        });
    }
}

module.exports = auth;
