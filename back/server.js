require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const { validateContentType } = require("./middleware/validation");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const { getCacheStats } = require("./cache");
const { registerTaskListeners } = require("./listeners");

const app = express();
const PORT = process.env.PORT || 5000;

registerTaskListeners();

// Enable CORS for frontend integration
app.use(cors());

// Body parser
app.use(express.json());

// Content-Type validator
app.use(validateContentType);

// Request logging middleware
app.use(logger);

// Auth & User routes (/register, /login, /me)
app.use("/", authRoutes);

// Protected Task routes (/tasks, /tasks/:id)
app.use("/tasks", taskRoutes);

app.get("/debug/cache", (req, res) => {
    res.status(200).json(getCacheStats());
});

// Custom 404 handler for unknown routes
app.use((req, res, next) => {
    res.status(404).json({
        error: "Not Found",
        message: `Route ${req.method} ${req.originalUrl} does not exist`
    });
});

// Global error handler middleware
app.use(errorHandler);

module.exports = app;

if (require.main === module) {
    // Database connection & Server startup
    const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/taskmanager";

    mongoose
        .connect(MONGO_URI)
        .then(() => {
            console.log("Connected to MongoDB successfully");
            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });
        })
        .catch((err) => {
            console.error("MongoDB Connection Error:", err.message);
            console.log("Starting Express server without active MongoDB connection...");
            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT} (Database Offline)`);
            });
        });
}