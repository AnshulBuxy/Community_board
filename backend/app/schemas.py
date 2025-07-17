from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import List, Optional

# User schemas
class UserBase(BaseModel):
    name: str
    username: str
    email: EmailStr
    role: str = "student"
    bio: Optional[str] = None
    location: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class User(UserBase):
    id: int
    avatar: str
    rating: float
    is_online: bool
    availability: str
    created_at: datetime
    skills: List[str] = []
    interests: List[str] = []

    class Config:
        from_attributes = True

# Post schemas
class PostBase(BaseModel):
    content: str

class PostCreate(PostBase):
    pass

class Post(PostBase):
    id: int
    author_id: int
    likes: int
    comments: int
    shares: int
    created_at: datetime
    author: User

    class Config:
        from_attributes = True

# Token schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# Skill and Interest schemas
class SkillBase(BaseModel):
    name: str

class Skill(SkillBase):
    id: int

    class Config:
        from_attributes = True

class InterestBase(BaseModel):
    name: str

class Interest(InterestBase):
    id: int

    class Config:
        from_attributes = True