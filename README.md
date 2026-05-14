# Blog Website Project

A full-stack blog website built using React + Vite for the frontend and Node.js + Express + MongoDB for the backend. The application includes authentication, blog management, and commenting features with a real-world REST API structure.

---

## Features

- User Registration and Login
- JWT-based Authentication
- Create, Read, Update, and Delete Blog Posts
- Comment System on Blog Posts
- Author Authorization (Only the author can edit/delete their posts)
- RESTful API Architecture

---

## Tech Stack

### Frontend
- React.js
- Vite
- React Router DOM
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js

---

## Folder Structure

```bash
blog-website/
│
├── client/                 # React + Vite Frontend
│
├── server/                 # Express Backend
│   ├── config/             # Database Configuration
│   ├── controllers/        # Business Logic
│   ├── middleware/         # Authentication Middleware
│   ├── models/             # Mongoose Models
│   ├── routes/             # API Routes
│   └── server.js
│
└── README.md
```

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <your_repository_url>
```

---

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

---

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

---

## Environment Variables

Create a `.env` file inside the `server/` folder and add the following:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

---

## Run the Project

### Start Backend

```bash
cd server
npm run dev
```

---

### Start Frontend

```bash
cd client
npm run dev
```

---

## API Endpoints

### Authentication

- `POST /api/auth/register` → Register User
- `POST /api/auth/login` → Login User

### Blog Posts

- `GET /api/posts` → Get All Posts
- `GET /api/posts/:id` → Get Single Post
- `POST /api/posts` → Create Post
- `PUT /api/posts/:id` → Update Post
- `DELETE /api/posts/:id` → Delete Post

### Comments

- `GET /api/posts/:postId/comments` → Get Comments
- `POST /api/posts/:postId/comments` → Add Comment
- `DELETE /api/posts/:postId/comments/:id` → Delete Comment

---

## Authentication

Protected routes require a JWT token in the request headers:

```bash
Authorization: Bearer <token>
```

---

## Notes

- CORS is configured to allow frontend-backend communication.
- MongoDB Atlas can be used for cloud database hosting.
- Only authenticated users can create posts and comments.
- Only the author can edit or delete their own posts/comments.

