# anonymous-message

A web application that lets registered users create a message link and receive anonymous messages.

## Table of contents
- [Demo](#demo)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quickstart (local)](#quickstart-local)
- [Environment variables](#environment-variables)
- [API](#api)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Contact & Security](#contact--security)
<!-- - [Acknowledgements](#acknowledgements) -->

## Demo
[Click for Live Demo](https://anonymous-message-wxfm.onrender.com/)

## Features
- User registration & login (JWT)
- Receive anonymous messages via a public link (/u/:username)
- Message listing and deletion for owners
- Backend API (Express + MongoDB) and frontend (React + Vite + Tailwind)

## Tech stack
- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB (mongoose)
- Auth: JWT, bcrypt
- Deployment: Render (recommended)

## Prerequisites
- Node.js >= 18
- npm
- A MongoDB database (Atlas or self-hosted)

## Quickstart (local)
1. Clone
   git clone <repo-url>
   cd Anonymous

2. Install
   npm install
   cd frontend
   npm install
   cd ..

3. Local dev (frontend and backend in separate terminals)
- Backend:
  cd backend
  npm run dev   # or `node backend/server.js`
- Frontend:
  cd frontend
  npm run dev

4. Build (for single-service deploy)
  npm run build  # runs frontend build: builds frontend/dist

## Environment variables
Create a `.env` (do not commit) with:
```
MONGO_URI=<your-mongo-uri>
PORT=5000
JWT_SECRET=<strong-secret>
VITE_API_URL=/api   # for single-service; use backend URL for split deploy
```

## API

Base URL: `/api` (or your backend URL in production)

### User Registration
**POST** `/api/users/register`

Request:
```json
{
  "username": "alice",
  "email": "alice@example.com",
  "password": "securePassword123"
}
```

Response (201):
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "alice",
    "email": "alice@example.com"
  }
}
```

Errors:
- **400** — Missing/invalid fields or username already exists
  ```json
  { "error": "Username already exists" }
  ```

---

### User Login
**POST** `/api/users/login`

Request:
```json
{
  "username": "alice",
  "password": "securePassword123"
}
```

Response (200):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "alice",
    "email": "alice@example.com"
  }
}
```

Errors:
- **401** — Invalid credentials
  ```json
  { "error": "Invalid username or password" }
  ```
- **404** — User not found
  ```json
  { "error": "User not found" }
  ```

---

### Get User Profile
**GET** `/api/users/profile`

Headers:
```
Authorization: Bearer <token>
```

Response (200):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "username": "alice",
  "email": "alice@example.com",
  "createdAt": "2025-12-01T10:30:00Z"
}
```

Errors:
- **401** — Missing or invalid token
  ```json
  { "error": "No token provided" }
  ```

---

### Send Anonymous Message
**POST** `/api/messages/:username`

Request:
```json
{
  "text": "You're doing great work!"
}
```

Response (200):
```json
{
  "success": true,
  "message": "Message sent anonymously!"
}
```

Errors:
- **400** — Empty or too long message
  ```json
  { "error": "Message cannot be empty" }
  ```
  ```json
  { "error": "Message exceeds 500 character limit" }
  ```
- **404** — User not found
  ```json
  { "error": "User not found" }
  ```

---

### Get Messages for User
**GET** `/api/messages/:username`

Response (200) — array sorted by newest first:
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "userId": "507f1f77bcf86cd799439011",
    "text": "You're awesome!",
    "createdAt": "2025-12-01T15:45:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439013",
    "userId": "507f1f77bcf86cd799439011",
    "text": "Keep it up!",
    "createdAt": "2025-12-01T14:20:00Z"
  }
]
```

Errors:
- **404** — User not found
  ```json
  { "error": "User not found" }
  ```

---

### Delete Message
**DELETE** `/api/messages/:id`

Headers:
```
Authorization: Bearer <token>
```

Response (200):
```json
{
  "success": true,
  "message": "Message deleted"
}
```

Errors:
- **401** — Missing token
  ```json
  { "error": "No token provided" }
  ```
- **403** — Not the message owner
  ```json
  { "error": "Unauthorized to delete this message" }
  ```
- **404** — Message not found
  ```json
  { "error": "Message not found" }
  ```

---

## Authentication

All protected endpoints require a valid JWT token in the `Authorization` header:

```
Authorization: Bearer <token>
```

- Token is returned after successful login.
- Token expires after 7 days.
- On 401 response, redirect user to login page and clear stored token.

Example (using fetch):
```javascript
const response = await fetch('/api/users/profile', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});
```

## Deployment
Two options:

1) Separate services (recommended)
- Backend: Render Web Service. Start command: `npm start` (or `node backend/server.js`). Set MONGO_URI and JWT_SECRET in Render env.
- Frontend: Render Static Site. Build command: `cd frontend && npm ci && npm run build`. Publish dir: `frontend/dist`. Set VITE_API_URL to `https://<backend>.onrender.com/api` in build env.

2) Single service (this repo builds frontend and serves `frontend/dist`)
- Root package.json includes: `"build": "cd frontend && npm ci && npm run build"`
- Render build command: `npm run build`
- Start command: `npm start`
- Set env vars MONGO_URI and JWT_SECRET. Set `VITE_API_URL=/api` before build.

## Testing
- Linting: `npm run lint` (frontend) and `npm run lint:fix` to auto-fix
- Manual: use Postman or curl to confirm endpoints and auth flows
- Unit tests: (coming soon)

## Contributing
- Fork > branch > PR
- Add tests for new features
- Follow existing code style; run linters

## License

This project is licensed under the MIT License — see [LICENSE](./LICENSE) for details.

## Contact & Security
- Report security issues privately at: [hishamadam77@gmail.com](hishamadam77@gmail.com)
- For general issues: open GitHub issue
