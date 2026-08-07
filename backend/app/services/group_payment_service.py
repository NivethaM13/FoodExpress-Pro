from sqlalchemy.orm import Session

from app.models.group_cart import GroupCart
from app.models.group_payment import GroupPayment



def calculate_user_amount(
    group_order_id:int,
    user_id:int,
    db:Session
):


    items = (

        db.query(GroupCart)

        .filter(

            GroupCart.group_order_id == group_order_id,

            GroupCart.user_id == user_id

        )

        .all()

    )


    total = 0


    for item in items:

        total += item.price * item.quantity


    return total






def create_group_payment(
    group_order_id:int,
    user_id:int,
    payment_method:str,
    db:Session
):


    amount = calculate_user_amount(
        group_order_id,
        user_id,
        db
    )


    payment = GroupPayment(

        group_order_id=group_order_id,

        user_id=user_id,

        amount=amount,

        payment_method=payment_method,

        payment_status="PAID"

    )


    db.add(payment)

    db.commit()

    db.refresh(payment)


    return payment