const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { validateTask } = require("../middleware/validation");
const {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

// All task routes are protected by auth middleware
router.use(auth);

router.get("/", getTasks);
router.get("/:id", getTaskById);
router.post("/", validateTask, createTask);
router.put("/:id", validateTask, updateTask);
router.delete("/:id", deleteTask);

module.exports = router;