const Task = require("../models/Task");

// GET /tasks
exports.getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (err) {
        next(err);
    }
};

// GET /tasks/:id
exports.getTaskById = async (req, res, next) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

        if (!task) {
            return res.status(404).json({
                error: "Not Found",
                message: "Task not found"
            });
        }

        res.status(200).json(task);
    } catch (err) {
        next(err);
    }
};

// POST /tasks
exports.createTask = async (req, res, next) => {
    try {
        const { title, description, completed, priority } = req.body;

        const task = await Task.create({
            title,
            description: description || "",
            completed: completed || false,
            priority: priority || "medium",
            user: req.user.id
        });

        res.status(201).json(task);
    } catch (err) {
        next(err);
    }
};

// PUT /tasks/:id
exports.updateTask = async (req, res, next) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({
                error: "Not Found",
                message: "Task not found"
            });
        }

        res.status(200).json(task);
    } catch (err) {
        next(err);
    }
};

// DELETE /tasks/:id
exports.deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });

        if (!task) {
            return res.status(404).json({
                error: "Not Found",
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task deleted successfully",
            id: req.params.id
        });
    } catch (err) {
        next(err);
    }
};