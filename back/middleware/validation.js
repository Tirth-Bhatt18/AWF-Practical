function validateContentType(req, res, next) {
    if (["POST", "PUT"].includes(req.method)) {
        const contentType = req.headers["content-type"];
        if (!contentType || !contentType.includes("application/json")) {
            return res.status(400).json({
                error: "Bad Request",
                message: "Content-Type must be application/json"
            });
        }
    }
    next();
}

function validateRegister(req, res, next) {
    const { name, email, password } = req.body || {};

    if (!name || typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
            error: "Validation failed",
            message: "Name is required"
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({
            error: "Validation failed",
            message: "A valid email address is required"
        });
    }

    if (!password || typeof password !== "string" || password.length < 6) {
        return res.status(400).json({
            error: "Validation failed",
            message: "Password must be at least 6 characters long"
        });
    }

    next();
}

function validateLogin(req, res, next) {
    const { email, password } = req.body || {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({
            error: "Validation failed",
            message: "A valid email address is required"
        });
    }

    if (!password) {
        return res.status(400).json({
            error: "Validation failed",
            message: "Password is required"
        });
    }

    next();
}

function validateTask(req, res, next) {
    const { title, priority } = req.body || {};

    if (req.method === "POST" && (!title || typeof title !== "string" || !title.trim())) {
        return res.status(400).json({
            error: "Validation failed",
            message: "Title is required"
        });
    }

    if (priority && !["low", "medium", "high"].includes(priority)) {
        return res.status(400).json({
            error: "Validation failed",
            message: "Priority must be low, medium, or high"
        });
    }

    next();
}

module.exports = {
    validateContentType,
    validateRegister,
    validateLogin,
    validateTask
};
