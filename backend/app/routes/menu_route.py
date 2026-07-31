from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import restaurant_owner_required

from app.models.menu import Menu
from app.models.restaurant import Restaurant
from app.models.user import User

from app.schemas.menu_schema import (
    MenuCreate,
    MenuUpdate,
)


router = APIRouter(
    prefix="/menus",
    tags=["Menu Management"]
)



# Add Food Item
@router.post("/")
def create_menu(
    menu: MenuCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(restaurant_owner_required)
):

    restaurant = (
        db.query(Restaurant)
        .filter(
            Restaurant.owner_id == current_user.id
        )
        .first()
    )


    if not restaurant:
        raise HTTPException(
            status_code=404,
            detail="Restaurant not found"
        )


    new_menu = Menu(
        restaurant_id=restaurant.id,
        name=menu.name,
        description=menu.description,
        category=menu.category,
        price=menu.price,
        image=menu.image,
        is_available=menu.is_available
    )


    db.add(new_menu)
    db.commit()
    db.refresh(new_menu)


    return {
        "message": "Food item added successfully",
        "menu": new_menu
    }




# View Restaurant Menu
@router.get("/")
def get_menu(
    db: Session = Depends(get_db)
):

    return db.query(Menu).all()




# View Single Food Item
@router.get("/{menu_id}")
def get_menu_item(
    menu_id: int,
    db: Session = Depends(get_db)
):

    item = (
        db.query(Menu)
        .filter(Menu.id == menu_id)
        .first()
    )


    if not item:
        raise HTTPException(
            status_code=404,
            detail="Food item not found"
        )


    return item




# Update Food Item
@router.put("/{menu_id}")
def update_menu(
    menu_id: int,
    menu: MenuUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(restaurant_owner_required)
):

    item = (
        db.query(Menu)
        .filter(Menu.id == menu_id)
        .first()
    )


    if not item:
        raise HTTPException(
            status_code=404,
            detail="Food item not found"
        )


    update_data = menu.model_dump(
        exclude_unset=True
    )


    for key, value in update_data.items():
        setattr(item, key, value)


    db.commit()
    db.refresh(item)


    return {
        "message": "Food item updated successfully",
        "menu": item
    }




# Delete Food Item
@router.delete("/{menu_id}")
def delete_menu(
    menu_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(restaurant_owner_required)
):

    item = (
        db.query(Menu)
        .filter(Menu.id == menu_id)
        .first()
    )


    if not item:
        raise HTTPException(
            status_code=404,
            detail="Food item not found"
        )


    db.delete(item)
    db.commit()


    return {
        "message": "Food item deleted successfully"
    }