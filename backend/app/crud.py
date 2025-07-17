from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from . import models, schemas
from .auth import get_password_hash
from typing import List, Optional

# User CRUD operations
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        name=user.name,
        username=user.username,
        email=user.email,
        password_hash=hashed_password,
        role=user.role,
        bio=user.bio,
        location=user.location
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

# Post CRUD operations
def create_post(db: Session, post: schemas.PostCreate, user_id: int):
    db_post = models.Post(
        content=post.content,
        author_id=user_id
    )
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

def get_posts(
    db: Session, 
    skip: int = 0, 
    limit: int = 100,
    sort_by: str = "recent",
    role_filter: str = "all",
    skill_filter: str = "all",
    search_query: str = ""
):
    query = db.query(models.Post).join(models.User)
    
    # Apply filters
    if role_filter != "all":
        if role_filter == "both":
            query = query.filter(or_(models.User.role == "mentor", models.User.role == "student"))
        else:
            query = query.filter(models.User.role == role_filter)
    
    if search_query:
        query = query.filter(
            or_(
                models.Post.content.ilike(f"%{search_query}%"),
                models.User.name.ilike(f"%{search_query}%"),
                models.User.username.ilike(f"%{search_query}%")
            )
        )
    
    # Apply sorting
    if sort_by == "most-liked":
        query = query.order_by(models.Post.likes.desc())
    elif sort_by == "most-commented":
        query = query.order_by(models.Post.comments.desc())
    else:  # recent
        query = query.order_by(models.Post.created_at.desc())
    
    return query.offset(skip).limit(limit).all()

def get_post(db: Session, post_id: int):
    return db.query(models.Post).filter(models.Post.id == post_id).first()

def update_post_likes(db: Session, post_id: int, increment: bool = True):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if post:
        if increment:
            post.likes += 1
        else:
            post.likes = max(0, post.likes - 1)
        db.commit()
        db.refresh(post)
    return post

# Skill CRUD operations
def get_or_create_skill(db: Session, skill_name: str):
    skill = db.query(models.Skill).filter(models.Skill.name == skill_name).first()
    if not skill:
        skill = models.Skill(name=skill_name)
        db.add(skill)
        db.commit()
        db.refresh(skill)
    return skill

def get_skills(db: Session):
    return db.query(models.Skill).all()

# Interest CRUD operations
def get_or_create_interest(db: Session, interest_name: str):
    interest = db.query(models.Interest).filter(models.Interest.name == interest_name).first()
    if not interest:
        interest = models.Interest(name=interest_name)
        db.add(interest)
        db.commit()
        db.refresh(interest)
    return interest

def get_interests(db: Session):
    return db.query(models.Interest).all()