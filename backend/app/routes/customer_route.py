from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import (
    get_current_user,
    customer_required,
)

from app.models.user import User
from app.models.address import Address
from app.models.favorite import FavoriteRestaurant
from app.models.restaurant import Restaurant
from app.models.order_preference import OrderPreference

from app.schemas.customer_schema import (
    ProfileUpdate,
    AddressCreate,
    AddressUpdate,
    PreferenceCreate,
)


router = APIRouter(
    prefix="/customer",
    tags=["Customer Management"]
)


# -----------------------------
# Personal Profile
# -----------------------------

@router.get("/profile")
def get_profile(
    current_user: User = Depends(customer_required)
):
    return {
        "id": current_user.id,
        "full_name": current_user.full_name,
        "email": current_user.email,
        "mobile": current_user.mobile,
        "profile_image": current_user.profile_image,
        "created_at": current_user.created_at
    }



@router.put("/profile")
def update_profile(
    data: ProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(customer_required)
):

    update_data = data.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(current_user, key, value)

    db.commit()
    db.refresh(current_user)

    return {
        "message": "Profile updated successfully",
        "user": current_user
    }



# -----------------------------
# Delivery Addresses
# -----------------------------

@router.post("/addresses")
def add_address(
    address: AddressCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(customer_required)
):

    new_address = Address(
        user_id=current_user.id,
        **address.model_dump()
    )

    db.add(new_address)
    db.commit()
    db.refresh(new_address)

    return {
        "message": "Address added successfully",
        "address": new_address
    }



@router.get("/addresses")
def get_addresses(
    db: Session = Depends(get_db),
    current_user: User = Depends(customer_required)
):

    return (
        db.query(Address)
        .filter(Address.user_id == current_user.id)
        .all()
    )



@router.put("/addresses/{address_id}")
def update_address(
    address_id: int,
    data: AddressUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(customer_required)
):

    address = (
        db.query(Address)
        .filter(
            Address.id == address_id,
            Address.user_id == current_user.id
        )
        .first()
    )

    if not address:
        raise HTTPException(
            status_code=404,
            detail="Address not found"
        )

    for key, value in data.model_dump(
        exclude_unset=True
    ).items():
        setattr(address, key, value)

    db.commit()

    return {
        "message": "Address updated successfully"
    }



@router.delete("/addresses/{address_id}")
def delete_address(
    address_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(customer_required)
):

    address = (
        db.query(Address)
        .filter(
            Address.id == address_id,
            Address.user_id == current_user.id
        )
        .first()
    )

    if not address:
        raise HTTPException(
            status_code=404,
            detail="Address not found"
        )

    db.delete(address)
    db.commit()

    return {
        "message": "Address deleted successfully"
    }



# -----------------------------
# Favorite Restaurants
# -----------------------------

@router.post("/favorites/{restaurant_id}")
def add_favorite(
    restaurant_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(customer_required)
):

    favorite = FavoriteRestaurant(
        user_id=current_user.id,
        restaurant_id=restaurant_id
    )

    db.add(favorite)
    db.commit()

    return {
        "message": "Restaurant added to favorites"
    }



@router.get("/favorites")
def get_favorites(
    db: Session = Depends(get_db),
    current_user: User = Depends(customer_required)
):

    return (
        db.query(Restaurant)
        .join(
            FavoriteRestaurant,
            Restaurant.id ==
            FavoriteRestaurant.restaurant_id
        )
        .filter(
            FavoriteRestaurant.user_id ==
            current_user.id
        )
        .all()
    )



@router.delete("/favorites/{restaurant_id}")
def remove_favorite(
    restaurant_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(customer_required)
):

    favorite = (
        db.query(FavoriteRestaurant)
        .filter(
            FavoriteRestaurant.user_id == current_user.id,
            FavoriteRestaurant.restaurant_id == restaurant_id
        )
        .first()
    )

    if not favorite:
        raise HTTPException(
            status_code=404,
            detail="Favorite not found"
        )

    db.delete(favorite)
    db.commit()

    return {
        "message": "Removed from favorites"
    }



# -----------------------------
# Order Preferences
# -----------------------------

@router.post("/preferences")
def create_preferences(
    preference: PreferenceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(customer_required)
):

    new_preference = OrderPreference(
        user_id=current_user.id,
        **preference.model_dump()
    )

    db.add(new_preference)
    db.commit()
    db.refresh(new_preference)

    return {
        "message": "Preferences saved",
        "preference": new_preference
    }



@router.get("/preferences")
def get_preferences(
    db: Session = Depends(get_db),
    current_user: User = Depends(customer_required)
):

    return (
        db.query(OrderPreference)
        .filter(
            OrderPreference.user_id ==
            current_user.id
        )
        .first()
    )