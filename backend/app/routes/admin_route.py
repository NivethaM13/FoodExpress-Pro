from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import (
    hash_password,
    admin_required
)
from app.models.user import User
from app.schemas.user_schema import UserRegister

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)


def create_user(user: UserRegister, role: str, db: Session):
    # Check Email
    existing_email = db.query(User).filter(User.email == user.email).first()
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already exists"
        )

    # Check Mobile
    existing_mobile = db.query(User).filter(User.mobile == user.mobile).first()
    if existing_mobile:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Mobile already exists"
        )

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        mobile=user.mobile,
        password=hash_password(user.password),
        role=role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": f"{role} created successfully",
        "user": {
            "id": new_user.id,
            "full_name": new_user.full_name,
            "email": new_user.email,
            "mobile": new_user.mobile,
            "role": new_user.role
        }
    }


@router.post("/create-admin")
def create_admin(
    user: UserRegister,
    db: Session = Depends(get_db),
    current_admin: User = Depends(admin_required)
):
    return create_user(user, "ADMIN", db)


@router.post("/create-restaurant-owner")
def create_restaurant_owner(
    user: UserRegister,
    db: Session = Depends(get_db),
    current_admin: User = Depends(admin_required)
):
    return create_user(user, "RESTAURANT_OWNER", db)


@router.post("/create-delivery-partner")
def create_delivery_partner(
    user: UserRegister,
    db: Session = Depends(get_db),
    current_admin: User = Depends(admin_required)
):
    return create_user(user, "DELIVERY_PARTNER", db)