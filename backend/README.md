# Sama Community Backend

A FastAPI-based backend for the Sama community platform.

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Database Setup

1. Create a PostgreSQL database named `sama_db`
2. Update the `.env` file with your database credentials:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/sama_db
SECRET_KEY=your-secret-key-here-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 3. Run the Application

```bash
python run.py
```

The API will be available at `http://localhost:8000`

### 4. API Documentation

Once the server is running, you can access:
- Interactive API docs: `http://localhost:8000/docs`
- Alternative docs: `http://localhost:8000/redoc`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user info

### Posts
- `GET /api/posts` - Get posts with filtering and sorting
- `POST /api/posts` - Create a new post (requires auth)
- `GET /api/posts/{post_id}` - Get specific post
- `POST /api/posts/{post_id}/like` - Toggle like on post (requires auth)

### Users
- `GET /api/users` - Get all users
- `GET /api/users/{user_id}` - Get specific user

### Skills & Interests
- `GET /api/skills` - Get all skills
- `GET /api/interests` - Get all interests

## Database Schema

The application uses the following main tables:
- `users` - User information and profiles
- `posts` - Community posts
- `skills` - Available skills
- `interests` - Available interests
- `user_skills` - Many-to-many relationship between users and skills
- `user_interests` - Many-to-many relationship between users and interests

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Development

To run in development mode with auto-reload:

```bash
python run.py
```

The server will automatically restart when you make changes to the code.