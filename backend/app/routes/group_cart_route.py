from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import customer_required

from app.models.user import User
from app.models.group_cart import GroupCart

from app.schemas.group_cart_schema import (
    GroupCartCreate
)

from app.services.group_cart_service import (
    add_group_cart_item,
    get_group_cart
)



router = APIRouter(
    prefix="/group-cart",
    tags=["Group Cart"]
)





# Add Item To Group Cart

@router.post("/")
def add_item(
    data: GroupCartCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(customer_required)
):


    item = add_group_cart_item(
        data,
        current_user.id,
        db
    )


    if not item:

        raise HTTPException(
            status_code=404,
            detail="Food item not found"
        )


    return {

        "message": "Food added to group cart",

        "cart_item_id": item.id,

        "group_order_id": item.group_order_id,

        "added_by": current_user.id,

        "menu_id": item.menu_id,

        "quantity": item.quantity,

        "price": item.price

    }





# View Shared Group Cart

@router.get("/{group_order_id}")
def view_group_cart(
    group_order_id:int,
    db:Session = Depends(get_db),
    current_user:User = Depends(customer_required)
):


    items = get_group_cart(
        group_order_id,
        db
    )


    return [

        {

            "id": item.id,

            "user_id": item.user_id,

            "menu_id": item.menu_id,

            "quantity": item.quantity,

            "price": item.price,

            "total": item.quantity * item.price

        }

        for item in items

    ]







# Remove Item From Group Cart

@router.delete("/{item_id}")
def remove_group_cart_item(
    item_id:int,
    db:Session = Depends(get_db),
    current_user:User = Depends(customer_required)
):


    item = (

        db.query(GroupCart)

        .filter(

            GroupCart.id == item_id,

            GroupCart.user_id == current_user.id

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

        "message":"Item removed from group cart"

    }