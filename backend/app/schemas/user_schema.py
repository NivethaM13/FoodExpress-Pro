from pydantic import BaseModel, EmailStr
from typing import Optional


class UserRegister(BaseModel):
    full_name: str
    email: EmailStr
    mobile: str
    password: str
    role: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    mobile: str
    role: str
    profile_image: Optional[str] = None
    is_verified: bool
    is_active: bool

    class Config:
        from_attributes = True