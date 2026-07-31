from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import (
    admin_required,
    restaurant_owner_required,
)
from app.models.restaurant import Restaurant
from app.models.user import User
from app.schemas.restaurant_schema import (
    RestaurantCreate,
    RestaurantUpdate,
)

router = APIRouter(
    prefix="/restaurants",
    tags=["Restaurants"],
)


# Create Restaurant (Restaurant Owner Only)
@router.post("/")
def create_restaurant(
    restaurant: RestaurantCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(restaurant_owner_required),
):
    existing_restaurant = (
        db.query(Restaurant)
        .filter(Restaurant.owner_id == current_user.id)
        .first()
    )

    if existing_restaurant:
        raise HTTPException(
            status_code=400,
            detail="You already have a restaurant."
        )

    new_restaurant = Restaurant(
        owner_id=current_user.id,
        name=restaurant.name,
        description=restaurant.description,
        cuisine=restaurant.cuisine,
        address=restaurant.address,
        city=restaurant.city,
        state=restaurant.state,
        pincode=restaurant.pincode,
        phone=restaurant.phone,
        email=restaurant.email,
        image=restaurant.image,
        opening_time=restaurant.opening_time,
        closing_time=restaurant.closing_time,
    )

    db.add(new_restaurant)
    db.commit()
    db.refresh(new_restaurant)

    return {
        "message": "Restaurant created successfully",
        "restaurant": new_restaurant,
    }


# Get Logged-in Owner Restaurant
@router.get("/my")
def get_my_restaurant(
    db: Session = Depends(get_db),
    current_user: User = Depends(restaurant_owner_required),
):
    restaurant = (
        db.query(Restaurant)
        .filter(Restaurant.owner_id == current_user.id)
        .first()
    )

    if not restaurant:
        raise HTTPException(
            status_code=404,
            detail="Restaurant not found"
        )

    return restaurant


# View All Restaurants
@router.get("/")
def get_restaurants(
    db: Session = Depends(get_db),
):
    return db.query(Restaurant).all()


# View Restaurant By ID
@router.get("/{restaurant_id}")
def get_restaurant(
    restaurant_id: int,
    db: Session = Depends(get_db),
):
    restaurant = (
        db.query(Restaurant)
        .filter(Restaurant.id == restaurant_id)
        .first()
    )

    if not restaurant:
        raise HTTPException(
            status_code=404,
            detail="Restaurant not found",
        )

    return restaurant


# Update Restaurant
@router.put("/{restaurant_id}")
def update_restaurant(
    restaurant_id: int,
    restaurant: RestaurantUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(restaurant_owner_required),
):
    db_restaurant = (
        db.query(Restaurant)
        .filter(Restaurant.id == restaurant_id)
        .first()
    )

    if not db_restaurant:
        raise HTTPException(
            status_code=404,
            detail="Restaurant not found",
        )

    if db_restaurant.owner_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="You can update only your own restaurant.",
        )

    update_data = restaurant.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_restaurant, key, value)

    db.commit()
    db.refresh(db_restaurant)

    return {
        "message": "Restaurant updated successfully",
        "restaurant": db_restaurant,
    }


# Delete Restaurant (Admin Only)
@router.delete("/{restaurant_id}")
def delete_restaurant(
    restaurant_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):
    restaurant = (
        db.query(Restaurant)
        .filter(Restaurant.id == restaurant_id)
        .first()
    )

    if not restaurant:
        raise HTTPException(
            status_code=404,
            detail="Restaurant not found",
        )

    db.delete(restaurant)
    db.commit()

    return {
        "message": "Restaurant deleted successfully",
    }