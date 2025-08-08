# Issue-Tracker-Backend
# 🐞 Issue Tracker - Backend

A backend API for managing issues, built with **Node.js**, **Express**, and **MongoDB**.  
Supports CRUD operations, filtering, authentication, and user assignment.

---

## 🚀 Features
- **Authentication**
  - User registration & login
  - JWT-based authentication
- **Issues Management**
  - Create, read, update, delete issues
  - Filter by tag, status, assigned user, and search
  - Pagination ready
- **Comments System**
  - Add and fetch comments for each issue
- **User Assignment**
  - Assign issues to registered users
- **Secure API**
  - Protected routes with JWT middleware
  - Validation & error handling

---

## 🛠️ Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT
- **Other**:
  - bcrypt (password hashing)
  - dotenv (environment variables)
  - cors (CORS policy)
  - morgan (logging)

---

## 📂 Folder Structure
backend/

│

├── models/ # Mongoose models

├── routes/ # Express routes

├── controllers/ # Business logic

├── middleware/ # Auth middleware

├── config/ # DB connection

├── .env.example # Example environment variables

└── server.js # Entry point


---

## ⚙️ Installation & Setup

### Clone the Repository
```bash
git clone https://github.com/yourusername/issue-tracker-backend.git
cd issue-tracker-backend

## Install Dependencies
npm install

## Environment Variables
PORT=5000
MONGO_URI=mongodb://localhost:27017/issue-tracker
JWT_SECRET=your_jwt_secret_here


📡 API Endpoints
Auth
Method	Endpoint	Description
POST	/auth/register	Register new user
POST	/auth/login	Login and get token
GET	/auth/me	Get current user

Issues
Method	Endpoint	Description
GET	/issues	Get all issues (filters: tag, status, assignedTo, search)
POST	/issues	Create a new issue
GET	/issues/:id	Get a single issue
PUT	/issues/:id	Update an issue
DELETE	/issues/:id	Delete an issue

Comments
Method	Endpoint	Description
GET	/comments/:issueId	Get comments for an issue
POST	/comments/:issueId	Add comment to an issue
