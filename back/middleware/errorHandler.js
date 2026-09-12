function errorHandler(err, req, res, next) {
    console.error(`[Error] ${err.name || "Error"}: ${err.message}`);

    // Mongoose validation error
    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({
            error: "Validation failed",
            message: messages.join(", ")
        });
    }

    // Mongoose bad ObjectId / CastError
    if (err.name === "CastError") {
        return res.status(400).json({
            error: "Bad Request",
            message: "Invalid ID format"
        });
    }

    // Duplicate key error (e.g. unique email)
    if (err.code === 11000) {
        return res.status(400).json({
            error: "Duplicate Error",
            message: "Email address already registered"
        });
    }

    const statusCode = err.status || err.statusCode || 500;
    res.status(statusCode).json({
        error: "Server Error",
        message: err.message || "Internal Server Error"
    });
}

module.exports = errorHandler;