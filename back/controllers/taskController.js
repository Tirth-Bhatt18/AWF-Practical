const Task = require("../models/Task");
const taskEvents = require("../events");
const {
    getCached,
    setCached,
    invalidateUserTasks
} = require("../cache");

// GET /tasks
exports.getTasks = async (req, res, next) => {
    try {
        const cacheKey = `all_tasks:${req.user.id}`;
        const cachedTasks = getCached(cacheKey);
        if (cachedTasks !== undefined) {
            return res.status(200).json(cachedTasks);
        }

        const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
        setCached(cacheKey, tasks);
        res.status(200).json(tasks);
    } catch (err) {
        next(err);
    }
};

// GET /tasks/:id
exports.getTaskById = async (req, res, next) => {
    try {
        const cacheKey = `task:${req.user.id}:${req.params.id}`;
        const cachedTask = getCached(cacheKey);
        if (cachedTask !== undefined) {
            return res.status(200).json(cachedTask);
        }

        const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

        if (!task) {
            return res.status(404).json({
                error: "Not Found",
                message: "Task not found"
            });
        }

        setCached(cacheKey, task);
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

        invalidateUserTasks(req.user.id);
        res.status(201).json(task);
        console.log(`[API] Response sent at ${new Date().toISOString()} for task creation`);
        taskEvents.emit("task-created", {
            taskId: task.id,
            title: task.title,
            timestamp: new Date().toISOString()
        });
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

        invalidateUserTasks(req.user.id, req.params.id);
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

        invalidateUserTasks(req.user.id, req.params.id);
        res.status(200).json({
            message: "Task deleted successfully",
            id: req.params.id
        });
        console.log(`[API] Response sent at ${new Date().toISOString()} for task deletion`);
        taskEvents.emit("task-deleted", {
            taskId: req.params.id,
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        next(err);
    }
};