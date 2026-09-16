# ITUE301 Advanced Web Development Frameworks

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

## 📌 Practical Mapping (P1 – P7)

| Practical | Title | Implemented Features |
| :--- | :--- | :--- |
| **Practical 1** | React Components | Reusable components (`Header`, `About`, `Skills`, `Footer`), props passing, array `.map()` rendering. |
| **Practical 2** | React Router + useState | `react-router-dom` navigation (`/`, `/projects`, `/contact`, `/tasks`, `404`), UI toggle state, controlled Contact form with real-time state reflection and character count, Light/Dark mode toggle. |
| **Practical 3** | REST API Consumption | GitHub API consumption in `Projects.jsx` with `useEffect()`, `useState()`, loading/error states, retry button, repository search filter, star counts. |
| **Practical 4** | Express REST API | Express server on `localhost:5000`, `GET`, `POST`, `PUT`, `DELETE` routes, logging middleware, Content-Type validation, custom 404 handler, error middleware. |
| **Practical 5** | MongoDB + Mongoose | Mongoose ODM connection via `MONGO_URI` in `.env`, `Task` schema (`title`, `description`, `completed`, `priority`, `createdAt`), structured error handling. |
| **Practical 6** | Full-Stack Integration | Connected React frontend with Express backend via CORS, centralized `src/api.js`, full CRUD operations in UI, delete confirmation, toast notifications. |
| **Practical 7** | JWT Authentication | `User` schema, `bcryptjs` password hashing, `/register`, `/login`, `/me` endpoint, JWT auth middleware (`req.user`), protected task routes, localStorage token management, 401 interceptor. |

---

## 🛠️ Environment Variables Setup

Create a `.env` file inside the `Pr4 Task Manager` directory (refer to `.env.example`):

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

## ⚡ Performance Optimization

Practical 8 adds route-based code splitting to the React frontend. `App.jsx` uses
`React.lazy()` with dynamic imports for the Home, Projects, Contact, Tasks, and
NotFound pages. Vite can therefore emit each page as a separate JavaScript chunk
instead of including every route in the initial bundle. The existing Tasks page
is also lazy-loaded as the largest route component, without adding a new dependency.

The route block is wrapped in `Suspense`, which renders the shared themed loading
state while a route's chunk is being downloaded. The navbar, footer, authentication
check, and application shell remain available while the route content loads.

### Measurement Record

Run `npm run build` from `front/` and record the generated asset sizes from the
Vite output. Use the browser Network tab with a hard reload to record initial JS
transferred and initial load time, then navigate to `/projects`, `/contact`, and
`/tasks` to observe their route-specific chunks. Use Slow 3G throttling when
checking the fallback UI.

| Metric | Before optimization | After optimization |
| :--- | :--- | :--- |
| Initial JavaScript transferred | _Record baseline_ | _Record after build_ |
| Initial load time | _Record baseline_ | _Record after build_ |
| Generated asset/chunk sizes | _Record baseline_ | _Record Vite output_ |
| Route chunk loading | _All route code initially loaded_ | _Record chunks on route navigation_ |

For the React DevTools Profiler exercise, record one unnecessary re-render and
the component that caused it here: _add observation after profiling_.

---

## 🧪 Testing Authentication Flow

1. Register a user on `/tasks` tab or via `POST /register`.
2. Verify password is saved as a **bcrypt hash** in MongoDB.
3. Login via `POST /login` and receive JWT token.
4. Access `GET /tasks` with `Authorization: Bearer <token>`.
5. Perform task **CRUD** (Create, Read, Update, Delete).
6. Test calling `GET /tasks` without token -> returns `401 Unauthorized`.
7. Logout from frontend -> clears token from `localStorage`.
