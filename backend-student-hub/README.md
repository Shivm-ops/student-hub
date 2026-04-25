# Student Hub Backend (Student Management System)

A simple, clean Node.js and Express backend with Supabase integration and JWT authentication.

## Features

- **Project Setup**: Express.js with a modular folder structure.
- **Supabase Integration**: Connects to Supabase using `@supabase/supabase-js`.
- **Authentication**: JWT-based login for an admin user.
- **Student Management**: Protected CRUD operations for students.
- **Secret Management**: Environment variables handled via `.env`.

## Folder Structure

```text
backend-student-hub/
├── config/             # Configuration files (Supabase)
├── controllers/        # Logic for handling requests
├── middleware/         # Custom middlewares (Auth, Error handling)
├── routes/             # API route definitions
├── .env                # Environment variables (ignored by Git)
├── .env.example        # Template for environment variables
├── .gitignore          # Files to ignore in Git
├── package.json        # Dependencies and scripts
└── server.js           # Main entry point
```

## Setup Instructions

### 1. Clone the repository and navigate to the directory

```bash
cd backend-student-hub
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory (use `.env.example` as a template) and add your Supabase credentials:

```text
PORT=5000
SUPABASE_URL=YOUR_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
JWT_SECRET=your_jwt_secret_key
```

### 4. Database Setup (Supabase)

Ensure you have a `students` table in your Supabase database with the following fields:

- `id`: int8 (Primary Key, Auto-increment)
- `name`: text
- `email`: text
- `course`: text

### 5. Start the server

```bash
npm start
# or
node server.js
```

## API Endpoints

### Authentication

- `POST /api/auth/login`
  - Body: `{ "username": "admin", "password": "admin123" }`
  - Returns: JWT Token

### Students (Protected - Requires Bearer Token)

- `GET /api/students` -> Fetch all students.
- `POST /api/students` -> Create a new student.
- `DELETE /api/students/:id` -> Delete a student by ID.

## Security Note

- Never expose the `SUPABASE_SERVICE_ROLE_KEY` in the frontend.
- This backend uses the service role key to perform admin-level operations securely.
