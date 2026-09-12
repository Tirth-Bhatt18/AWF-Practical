import { useState, useEffect } from "react";
import {
    getToken,
    setToken,
    removeToken,
    registerUser,
    loginUser,
    getMe,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask
} from "../api";

function Tasks({ user, setUser, setToast }) {
    // Auth Forms state
    const [isRegisterView, setIsRegisterView] = useState(false);
    const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });
    const [authLoading, setAuthLoading] = useState(false);

    // Tasks state
    const [tasks, setTasks] = useState([]);
    const [tasksLoading, setTasksLoading] = useState(false);
    const [tasksError, setTasksError] = useState(null);

    // New Task Form state
    const [newTask, setNewTask] = useState({ title: "", description: "", priority: "medium" });

    // Load User and Tasks if Token exists
    const loadUserDataAndTasks = async () => {
        const token = getToken();
        if (!token) return;

        setTasksLoading(true);
        setTasksError(null);

        try {
            const meRes = await getMe();
            setUser(meRes.user);

            const tasksRes = await fetchTasks();
            setTasks(tasksRes);
        } catch (err) {
            setTasksError(err.message);
            if (err.message.includes("401") || err.message.includes("Unauthorized")) {
                setUser(null);
            }
        } finally {
            setTasksLoading(false);
        }
    };

    useEffect(() => {
        if (getToken()) {
            loadUserDataAndTasks();
        } else {
            setUser(null);
            setTasks([]);
        }
    }, []);

    // Handle Login / Register submit
    const handleAuthSubmit = async (e) => {
        e.preventDefault();
        setAuthLoading(true);

        try {
            if (isRegisterView) {
                const res = await registerUser(authForm);
                setToast({ type: "success", message: "Registration successful! Please log in." });
                setIsRegisterView(false);
                setAuthForm({ name: "", email: "", password: "" });
            } else {
                const res = await loginUser({ email: authForm.email, password: authForm.password });
                setToken(res.token);
                setUser(res.user);
                setToast({ type: "success", message: `Welcome back, ${res.user.name}!` });
                setAuthForm({ name: "", email: "", password: "" });
                loadUserDataAndTasks();
            }
        } catch (err) {
            setToast({ type: "error", message: err.message });
        } finally {
            setAuthLoading(false);
        }
    };

    // Handle Create Task
    const handleCreateTask = async (e) => {
        e.preventDefault();
        if (!newTask.title.trim()) return;

        try {
            const created = await createTask(newTask);
            setTasks([created, ...tasks]);
            setNewTask({ title: "", description: "", priority: "medium" });
            setToast({ type: "success", message: "Task created successfully!" });
        } catch (err) {
            setToast({ type: "error", message: err.message });
        }
    };

    // Handle Toggle Completed status
    const handleToggleComplete = async (task) => {
        try {
            const updated = await updateTask(task._id, { completed: !task.completed });
            setTasks(tasks.map((t) => (t._id === task._id ? updated : t)));
            setToast({
                type: "success",
                message: `Task marked as ${updated.completed ? "completed" : "pending"}`
            });
        } catch (err) {
            setToast({ type: "error", message: err.message });
        }
    };

    // Handle Delete Task with Confirmation
    const handleDeleteTask = async (id) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;

        try {
            await deleteTask(id);
            setTasks(tasks.filter((t) => t._id !== id));
            setToast({ type: "success", message: "Task deleted successfully!" });
        } catch (err) {
            setToast({ type: "error", message: err.message });
        }
    };

    // Handle Logout
    const handleLogout = () => {
        removeToken();
        setUser(null);
        setTasks([]);
        setToast({ type: "success", message: "Logged out successfully." });
    };

    return (
        <div className="page-container">
            <header className="page-header">
                <h2>Practicals 4–7: Full-Stack Task Manager & JWT Auth</h2>
                <p>Express REST API + MongoDB Mongoose + JWT Authentication + React Integration.</p>
            </header>

            {!user ? (
                /* Unauthenticated View: Login / Register Forms */
                <div className="auth-container">
                    <div className="card auth-card">
                        <h3>{isRegisterView ? "Register User (P7)" : "Login User (P7)"}</h3>

                        <form onSubmit={handleAuthSubmit} className="auth-form">
                            {isRegisterView && (
                                <div className="form-group">
                                    <label htmlFor="authName">Name:</label>
                                    <input
                                        id="authName"
                                        type="text"
                                        value={authForm.name}
                                        onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                                        placeholder="Full Name"
                                        required
                                    />
                                </div>
                            )}

                            <div className="form-group">
                                <label htmlFor="authEmail">Email:</label>
                                <input
                                    id="authEmail"
                                    type="email"
                                    value={authForm.email}
                                    onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                                    placeholder="email@example.com"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="authPassword">Password:</label>
                                <input
                                    id="authPassword"
                                    type="password"
                                    value={authForm.password}
                                    onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary btn-full" disabled={authLoading}>
                                {authLoading ? "Processing..." : isRegisterView ? "Register" : "Login"}
                            </button>
                        </form>

                        <div className="auth-switch">
                            <p>
                                {isRegisterView ? "Already have an account?" : "Don't have an account?"}{" "}
                                <button
                                    type="button"
                                    className="link-btn"
                                    onClick={() => setIsRegisterView(!isRegisterView)}
                                >
                                    {isRegisterView ? "Switch to Login" : "Switch to Register"}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                /* Authenticated View: Task Manager */
                <div className="tasks-container">
                    <div className="user-banner">
                        <div>
                            <h3>Welcome, {user.name}!</h3>
                            <p className="subtext">Email: {user.email}</p>
                        </div>
                        <button type="button" onClick={handleLogout} className="btn btn-secondary">
                            Logout
                        </button>
                    </div>

                    {/* Create Task Form */}
                    <div className="card task-form-card">
                        <h3>Create New Task (POST /tasks)</h3>
                        <form onSubmit={handleCreateTask} className="task-form">
                            <div className="form-row">
                                <div className="form-group flex-2">
                                    <label htmlFor="taskTitle">Task Title *:</label>
                                    <input
                                        id="taskTitle"
                                        type="text"
                                        value={newTask.title}
                                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                        placeholder="e.g. Complete ITUE301 Practical 7"
                                        required
                                    />
                                </div>
                                <div className="form-group flex-1">
                                    <label htmlFor="taskPriority">Priority:</label>
                                    <select
                                        id="taskPriority"
                                        value={newTask.priority}
                                        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="taskDesc">Description (Optional):</label>
                                <input
                                    id="taskDesc"
                                    type="text"
                                    value={newTask.description}
                                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                    placeholder="Additional task details..."
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">➕ Add Task</button>
                        </form>
                    </div>

                    {/* Task List Header & Status */}
                    <div className="task-list-section">
                        <h3>Your Tasks ({tasks.length})</h3>

                        {tasksLoading && <div className="status-box loading-box"><p>⌛ Loading tasks from Express REST API...</p></div>}
                        {tasksError && (
                            <div className="status-box error-box">
                                <p>❌ {tasksError}</p>
                                <button type="button" onClick={loadUserDataAndTasks} className="btn btn-danger">Retry</button>
                            </div>
                        )}

                        {!tasksLoading && !tasksError && tasks.length === 0 && (
                            <p className="no-data">No tasks found. Create one above!</p>
                        )}

                        <div className="task-list">
                            {tasks.map((task) => (
                                <div key={task._id} className={`task-card ${task.completed ? "completed" : ""}`}>
                                    <div className="task-header">
                                        <label className="checkbox-container">
                                            <input
                                                type="checkbox"
                                                checked={task.completed}
                                                onChange={() => handleToggleComplete(task)}
                                            />
                                            <span className={`task-title ${task.completed ? "line-through" : ""}`}>
                                                {task.title}
                                            </span>
                                        </label>
                                        <span className={`badge priority-${task.priority}`}>
                                            {task.priority.toUpperCase()}
                                        </span>
                                    </div>

                                    {task.description && <p className="task-desc">{task.description}</p>}

                                    <div className="task-footer">
                                        <span className="task-date">
                                            Created: {new Date(task.createdAt).toLocaleDateString()}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteTask(task._id)}
                                            className="btn btn-small btn-danger"
                                        >
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Tasks;
