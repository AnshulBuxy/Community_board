from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session
from datetime import timedelta
from typing import List, Optional

from . import crud, models, schemas, auth
from .database import SessionLocal, engine, get_db

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sama Community API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()

# Authentication endpoints
@app.post("/api/auth/login", response_model=schemas.Token)
async def login(user_credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    user = auth.authenticate_user(db, user_credentials.username, user_credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    
    # Update user online status
    user.is_online = True
    db.commit()
    
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/api/auth/register", response_model=schemas.User)
async def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    return crud.create_user(db=db, user=user)

@app.get("/api/auth/me", response_model=schemas.User)
async def get_current_user_info(current_user: models.User = Depends(auth.get_current_user)):
    return current_user

# User endpoints
@app.get("/api/users", response_model=List[schemas.User])
async def get_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

@app.get("/api/users/{user_id}", response_model=schemas.User)
async def get_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# Post endpoints
@app.post("/api/posts", response_model=schemas.Post)
async def create_post(
    post: schemas.PostCreate,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    return crud.create_post(db=db, post=post, user_id=current_user.id)

@app.get("/api/posts", response_model=List[schemas.Post])
async def get_posts(
    skip: int = 0,
    limit: int = 100,
    sort_by: str = "recent",
    role_filter: str = "all",
    skill_filter: str = "all",
    search_query: str = "",
    db: Session = Depends(get_db)
):
    posts = crud.get_posts(
        db=db,
        skip=skip,
        limit=limit,
        sort_by=sort_by,
        role_filter=role_filter,
        skill_filter=skill_filter,
        search_query=search_query
    )
    return posts

@app.get("/api/posts/{post_id}", response_model=schemas.Post)
async def get_post(post_id: int, db: Session = Depends(get_db)):
    db_post = crud.get_post(db, post_id=post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return db_post

@app.post("/api/posts/{post_id}/like")
async def toggle_like_post(
    post_id: int,
    increment: bool = True,
    current_user: models.User = Depends(auth.get_current_user),
    db: Session = Depends(get_db)
):
    post = crud.update_post_likes(db, post_id=post_id, increment=increment)
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"message": "Post like updated", "likes": post.likes}

# Skills and Interests endpoints
@app.get("/api/skills", response_model=List[schemas.Skill])
async def get_skills(db: Session = Depends(get_db)):
    return crud.get_skills(db)

@app.get("/api/interests", response_model=List[schemas.Interest])
async def get_interests(db: Session = Depends(get_db)):
    return crud.get_interests(db)

# Health check
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "Sama Community API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)