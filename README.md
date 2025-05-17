# TaskMate

A simple and elegant Todo web application to help you organize, track, and complete your daily tasks efficiently.

## Features

- Add, complete, and delete todos effortlessly.
- Filter todos by All, Active, or Completed.
- View total todos, completed, and remaining counts.
- User authentication with secure login and signup.
- Persistent data storage using MongoDB.
- Responsive design built with Tailwind CSS.
- Real-time UI feedback with React and Framer Motion animations.
- Friendly toast notifications for task actions and errors.

## Tech Stack

- Frontend: React, Tailwind CSS, Framer Motion
- Backend: Node.js, Express.js, MongoDB (Mongoose)
- Authentication: JWT-based user sessions
- Notifications: React Toastify

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB instance (local or cloud)

### Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/taskmate.git
   cd taskmate
2.Install dependencies:
    cd backend
    npm install 
    cd ..
    cd frontend 
    npm install 
3.Create a .env file in the backend/ folder:
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
4.Start the backend server:
    npm run dev
5.Start the frontend server:
    npm run dev
6.Visit the app in your browser:
    http://localhost:5173--or any port the frontedn run on


