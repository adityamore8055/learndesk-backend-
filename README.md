# LearnDesk Backend

Production-ready backend for a Cloud-Based E-Learning System built with Node.js, Express, MongoDB (Mongoose), JWT auth, and strict MVC structure.

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt password hashing
- dotenv environment variables

## Project Structure

```text
server/
  config/
    db.js
  models/
    User.js
    Course.js
    Enrollment.js
  controllers/
    authController.js
    courseController.js
    enrollmentController.js
  routes/
    authRoutes.js
    courseRoutes.js
    enrollmentRoutes.js
  middleware/
    authMiddleware.js
    roleMiddleware.js
    errorHandler.js
  utils/
    asyncHandler.js
    generateToken.js
    seedData.js
  server.js
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env` from `.env.example`:
   ```bash
   copy .env.example .env
   ```
3. Update `.env` values:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `PORT`

## Run

- Start server:
  ```bash
  npm start
  ```
- Seed dummy data (1 admin + 2 courses):
  ```bash
  npm run seed
  ```

## API Endpoints

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`

### Courses

- `GET /api/courses`
- `GET /api/courses/:id`
- `POST /api/courses` (admin only)
- `PUT /api/courses/:id` (admin only)
- `DELETE /api/courses/:id` (admin only)

### Enrollment

- `POST /api/enroll/:courseId`
- `GET /api/enrollments`
- `PUT /api/progress/:courseId`

## Postman Testing Guide

Use `http://localhost:5000` as base URL.

1. **Seed data**
   - Run: `npm run seed`
   - Admin credentials:
     - Email: `admin@learndesk.com`
     - Password: `Admin@123`

2. **Admin login**
   - `POST /api/auth/login`
   - Body:
     ```json
     {
       "email": "admin@learndesk.com",
       "password": "Admin@123"
     }
     ```
   - Save returned `token` as `ADMIN_TOKEN`

3. **Create a student account**
   - `POST /api/auth/signup`
   - Body:
     ```json
     {
       "name": "Student One",
       "email": "student1@learndesk.com",
       "password": "Student@123",
       "role": "student"
     }
     ```

4. **Student login**
   - `POST /api/auth/login`
   - Use the student credentials
   - Save returned `token` as `STUDENT_TOKEN`

5. **Get courses**
   - `GET /api/courses`
   - Copy a course `_id`

6. **Enroll in course (student)**
   - `POST /api/enroll/:courseId`
   - Header: `Authorization: Bearer STUDENT_TOKEN`

7. **Get student enrollments**
   - `GET /api/enrollments`
   - Header: `Authorization: Bearer STUDENT_TOKEN`

8. **Update progress**
   - `PUT /api/progress/:courseId`
   - Header: `Authorization: Bearer STUDENT_TOKEN`
   - Body:
     ```json
     {
       "progress": 50,
       "completedLessons": ["Introduction to Node.js"]
     }
     ```

9. **Admin-only course create/update/delete**
   - Use `Authorization: Bearer ADMIN_TOKEN`
   - Test:
     - `POST /api/courses`
     - `PUT /api/courses/:id`
     - `DELETE /api/courses/:id`

## Notes

- Passwords are hashed with bcrypt.
- JWT tokens expire in 7 days.
- Protected routes use `Authorization: Bearer <token>`.
- Centralized error handling is implemented.
