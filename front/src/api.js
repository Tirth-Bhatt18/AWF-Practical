const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getToken = () => localStorage.getItem("token");

export const setToken = (token) => {
    if (token) {
        localStorage.setItem("token", token);
    } else {
        localStorage.removeItem("token");
    }
};

export const removeToken = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("auth-change"));
};

// Generic fetch wrapper with auth header
async function request(endpoint, options = {}) {
    const token = getToken();
    const headers = {
        "Content-Type": "application/json",
        ...options.headers
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (response.status === 401) {
        removeToken();
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Unauthorized (401). Please log in again.");
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.message || `Request failed with status ${response.status}`);
    }

    return data;
}

// Auth API Calls
export const registerUser = (userData) => request("/register", { method: "POST", body: JSON.stringify(userData) });
export const loginUser = (credentials) => request("/login", { method: "POST", body: JSON.stringify(credentials) });
export const getMe = () => request("/me", { method: "GET" });

// Task API Calls (Protected)
export const fetchTasks = () => request("/tasks", { method: "GET" });
export const createTask = (taskData) => request("/tasks", { method: "POST", body: JSON.stringify(taskData) });
export const updateTask = (id, taskData) => request(`/tasks/${id}`, { method: "PUT", body: JSON.stringify(taskData) });
export const deleteTask = (id) => request(`/tasks/${id}`, { method: "DELETE" });
