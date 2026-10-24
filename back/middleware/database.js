const mongoose = require("mongoose");

function requireDatabase(req, res, next) {
    if (mongoose.connection.readyState === 1) {
        return next();
    }

    return res.status(503).json({
        error: "Database Unavailable",
        message: "The database is currently unavailable. Check the MongoDB connection and Atlas IP allowlist, then try again."
    });
}

module.exports = requireDatabase;
