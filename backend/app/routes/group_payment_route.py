from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import customer_required

from app.models.user import User

from app.services.group_payment_service import (
    create_group_payment
)


router = APIRouter(
    prefix="/group-payments",
    tags=["Group Payment"]
)





# Create Group Payment

@router.post("/")
def pay_group_order(

    group_order_id:int,

    payment_method:str,

    db:Session = Depends(get_db),

    current_user:User = Depends(customer_required)

):


    payment = create_group_payment(

        group_order_id,

        current_user.id,

        payment_method,

        db

    )


    return {

        "message":"Group payment completed successfully",

        "payment_id":payment.id,

        "group_order_id":payment.group_order_id,

        "user_id":payment.user_id,

        "amount":payment.amount,

        "payment_status":payment.payment_status,

        "payment_method":payment.payment_method

    }