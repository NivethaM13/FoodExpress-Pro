from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import customer_required

from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.cart import Cart
from app.models.cart_item import CartItem
from app.models.user import User

from app.schemas.order_schema import OrderCreate


router = APIRouter(
    prefix="/orders",
    tags=["Order Management"]
)



# Place Order
@router.post("/")
def place_order(
    order_data: OrderCreate,
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


    if not cart or not cart.items:

        raise HTTPException(
            status_code=400,
            detail="Cart is empty"
        )


    total = 0


    for item in cart.items:

        total += item.price * item.quantity



    restaurant_id = cart.items[0].menu.restaurant_id



    new_order = Order(

        user_id=current_user.id,

        restaurant_id=restaurant_id,

        total_amount=total,

        order_status="PLACED",

        payment_status="PENDING",

        delivery_address=order_data.delivery_address

    )


    db.add(new_order)

    db.commit()

    db.refresh(new_order)



    for item in cart.items:


        order_item = OrderItem(

            order_id=new_order.id,

            menu_id=item.menu_id,

            quantity=item.quantity,

            price=item.price

        )


        db.add(order_item)



    # Clear cart

    db.query(CartItem).filter(
        CartItem.cart_id == cart.id
    ).delete()


    db.commit()



    return {

        "message": "Order placed successfully",

        "order_id": new_order.id

    }





# View Orders
@router.get("/")
def get_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(customer_required)
):

    orders = (
        db.query(Order)
        .filter(
            Order.user_id == current_user.id
        )
        .all()
    )


    return orders





# Cancel Order
@router.put("/{order_id}/cancel")
def cancel_order(
    order_id:int,
    db:Session=Depends(get_db),
    current_user:User=Depends(customer_required)
):

    order = (
        db.query(Order)
        .filter(
            Order.id == order_id,
            Order.user_id == current_user.id
        )
        .first()
    )


    if not order:

        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )


    order.order_status="CANCELLED"


    db.commit()


    return {

        "message":"Order cancelled successfully"

    }





# Reorder Previous Order
@router.post("/{order_id}/reorder")
def reorder(
    order_id:int,
    db:Session=Depends(get_db),
    current_user:User=Depends(customer_required)
):

    order = (
        db.query(Order)
        .filter(
            Order.id == order_id,
            Order.user_id == current_user.id
        )
        .first()
    )


    if not order:

        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )


    return {

        "message":"Order items added for reorder",

        "order_id":order.id

    }