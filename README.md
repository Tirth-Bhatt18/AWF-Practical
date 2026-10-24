# ITUE301 Advanced Web Development Frameworks

[![CI Pipeline](https://github.com/Tirth-Bhatt18/AWF-Practical/actions/workflows/ci.yml/badge.svg)](https://github.com/Tirth-Bhatt18/AWF-Practical/actions/workflows/ci.yml)

This repository contains the complete, continuously evolving full-stack Web Application for **ITUE301**.

---

## 🏗️ System Architecture

```text
React Frontend (Vite)
  localhost:5173
        |
        | HTTP fetch() / JSON
        | Headers: Authorization: Bearer <token>
        ↓
Express REST API Backend
  localhost:5000
        |
        ├── Auth Middleware (JWT Verification)
        ├── Validation Middleware
        ├── Request Logging Middleware
        |
        ↓ Mongoose ODM
     MongoDB
```

---

## 📌 Practical Mapping (P1 – P12)

| Practical | Title | Implemented Features |
| :--- | :--- | :--- |
| **Practical 1** | React Components | Reusable components (`Header`, `About`, `Skills`, `Footer`), props passing, array `.map()` rendering. |
| **Practical 2** | React Router + useState | `react-router-dom` navigation (`/`, `/projects`, `/contact`, `/tasks`, `404`), UI toggle state, controlled Contact form with real-time state reflection and character count, Light/Dark mode toggle. |
| **Practical 3** | REST API Consumption | GitHub API consumption in `Projects.jsx` with `useEffect()`, `useState()`, loading/error states, retry button, repository search filter, star counts. |
| **Practical 4** | Express REST API | Express server on `localhost:5000`, `GET`, `POST`, `PUT`, `DELETE` routes, logging middleware, Content-Type validation, custom 404 handler, error middleware. |
| **Practical 5** | MongoDB + Mongoose | Mongoose ODM connection via `MONGO_URI` in `.env`, `Task` schema (`title`, `description`, `completed`, `priority`, `createdAt`), structured error handling. |
| **Practical 6** | Full-Stack Integration | Connected React frontend with Express backend via CORS, centralized `src/api.js`, full CRUD operations in UI, delete confirmation, toast notifications. |
| **Practical 7** | JWT Authentication | `User` schema, `bcryptjs` password hashing, `/register`, `/login`, `/me` endpoint, JWT auth middleware (`req.user`), protected task routes, localStorage token management, 401 interceptor. |
| **Practical 8** | Lazy Loading | React route-based code splitting with `React.lazy()` and `Suspense`. |
| **Practical 9** | In-Memory Caching | User-scoped `node-cache` caching for task list and individual task reads, invalidation, and hit/miss statistics. |
| **Practical 10** | Event-Driven Processing | Native Node.js `EventEmitter` listeners for asynchronous task-created and task-deleted notifications. |
| **Practical 11** | Docker Compose | Containerized frontend, backend, and MongoDB services with a persistent MongoDB volume. |
| **Practical 12** | CI/CD Pipeline | GitHub Actions workflow that installs dependencies, runs backend tests, lints the frontend, and builds the frontend on pushes and pull requests targeting `main`. |


## 🛠️ Environment Variables Setup

Create a `.env` file inside the `back` directory (refer to `.env.example`):

```env
PORT=5000
MONGO_URI=???
JWT_SECRET=???
```

---

## 🚀 How to Run the Project

### 1. Start the Express Backend

```bash
cd "back"
npm install
npm run dev
# Server runs on http://localhost:5000
```

### 2. Start the React Frontend

```bash
cd "front"
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 📡 REST API Endpoints

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Public | Register a new user (`name`, `email`, `password`) |
| `POST` | `/login` | Public | Login user & return JWT token |
| `GET` | `/me` | 🔒 Protected | Get currently authenticated user info |
| `GET` | `/tasks` | 🔒 Protected | Get all tasks belonging to authenticated user |
| `GET` | `/tasks/:id` | 🔒 Protected | Get specific task by ID |
| `POST` | `/tasks` | 🔒 Protected | Create a new task (`title`, `description`, `priority`) |
| `PUT` | `/tasks/:id` | 🔒 Protected | Update a task by ID |
| `DELETE` | `/tasks/:id` | 🔒 Protected | Delete a task by ID |

---
