from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import customer_required

from app.models.cart import Cart
from app.models.cart_item import CartItem
from app.models.menu import Menu
from app.models.user import User

from app.schemas.cart_schema import (
    CartItemCreate,
    CartItemUpdate
)


router = APIRouter(
    prefix="/cart",
    tags=["Cart Management"]
)



# Add Item To Cart
@router.post("/")
def add_to_cart(
    item: CartItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(customer_required)
):

    cart = (
        db.query(Cart)
        .filter(
            Cart.user_id == current_user.id
        )
        .first()
    )


    if not cart:

        cart = Cart(
            user_id=current_user.id
        )

        db.add(cart)
        db.commit()
        db.refresh(cart)



    menu_item = (
        db.query(Menu)
        .filter(
            Menu.id == item.menu_id
        )
        .first()
    )


    if not menu_item:

        raise HTTPException(
            status_code=404,
            detail="Food item not found"
        )



    cart_item = CartItem(
        cart_id=cart.id,
        menu_id=menu_item.id,
        quantity=item.quantity,
        price=menu_item.price
    )


    db.add(cart_item)
    db.commit()
    db.refresh(cart_item)


    return {
        "message": "Item added to cart",
        "cart_item": cart_item
    }





# View Cart
@router.get("/")
def get_cart(
    db: Session = Depends(get_db),
    current_user: User = Depends(customer_required)
):

    cart = (
        db.query(Cart)
        .filter(
            Cart.user_id == current_user.id
        )
        .first()
    )


    if not cart:

        return {
            "message": "Cart is empty"
        }


    return {

        "id": cart.id,

        "user_id": cart.user_id,


        "items": [

            {
                "id": item.id,
                "menu_id": item.menu_id,
                "quantity": item.quantity,
                "price": item.price
            }

            for item in cart.items

        ],


        "created_at": cart.created_at,

        "updated_at": cart.updated_at

    }





# Update Quantity
@router.put("/{item_id}")
def update_quantity(
    item_id: int,
    item: CartItemUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(customer_required)
):

    cart_item = (
        db.query(CartItem)
        .filter(
            CartItem.id == item_id
        )
        .first()
    )


    if not cart_item:

        raise HTTPException(
            status_code=404,
            detail="Cart item not found"
        )


    cart_item.quantity = item.quantity


    db.commit()
    db.refresh(cart_item)


    return {

        "message": "Quantity updated",

        "item": {

            "id": cart_item.id,
            "menu_id": cart_item.menu_id,
            "quantity": cart_item.quantity,
            "price": cart_item.price

        }

    }





# Remove Item
@router.delete("/{item_id}")
def remove_item(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(customer_required)
):

    item = (
        db.query(CartItem)
        .filter(
            CartItem.id == item_id
        )
        .first()
    )


    if not item:

        raise HTTPException(
            status_code=404,
            detail="Cart item not found"
        )


    db.delete(item)

    db.commit()


    return {

        "message": "Item removed from cart"

    }