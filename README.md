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

## API (short)
Base: <VITE_API_URL or /api>

- POST /api/users/register
  Body: { username, email, password }
- POST /api/users/login
  Body: { username, password }
  Response: { token, user }
- GET /api/messages/:username
  Public messages for a user
- POST /api/messages/:username
  Body: { text } (anonymous)
- DELETE /api/messages/:id
  Protected — Authorization: Bearer <token>

Include full request/response examples and error codes here.

## Authentication
- JWT tokens returned by /api/users/login
- Frontend stores token (e.g., localStorage) and sends Authorization header
- Tokens expire (configure in backend); handle 401 by redirecting to login

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
- Manual: use Postman or curl to confirm endpoints and auth flows

## Contributing
- Fork > branch > PR
- Add tests for new features
- Follow existing code style; run linters

## License

This project is licensed under the MIT License — see [LICENSE](./LICENSE) for details.

## Contact & Security
- Report security issues privately at: [hishamadam77@gmail.com](hishamadam77@gmail.com)
- For general issues: open GitHub issue
