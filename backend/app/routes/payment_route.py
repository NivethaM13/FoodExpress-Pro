from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import customer_required

from app.models.payment import Payment
from app.models.order import Order
from app.models.user import User

from app.schemas.payment_schema import (
    PaymentCreate,
    PaymentUpdate
)


router = APIRouter(
    prefix="/payments",
    tags=["Payment Management"]
)



# Create Payment

@router.post("/")
def create_payment(
    data: PaymentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(customer_required)
):

    order = (
        db.query(Order)
        .filter(
            Order.id == data.order_id
        )
        .first()
    )


    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )


    payment = Payment(

        order_id=data.order_id,

        user_id=current_user.id,

        payment_method=data.payment_method,

        amount=data.amount,

        payment_status="PENDING"

    )


    db.add(payment)

    db.commit()

    db.refresh(payment)


    return {
        "message":"Payment created",
        "payment":payment
    }





# Update Payment Status

@router.put("/{payment_id}")
def update_payment(
    payment_id:int,
    data:PaymentUpdate,
    db:Session=Depends(get_db),
    current_user:User=Depends(customer_required)
):

    payment = (
        db.query(Payment)
        .filter(
            Payment.id == payment_id
        )
        .first()
    )


    if not payment:
        raise HTTPException(
            status_code=404,
            detail="Payment not found"
        )


    payment.payment_status = data.payment_status

    payment.transaction_id = data.transaction_id


    db.commit()

    db.refresh(payment)


    return {
        "message":"Payment updated",
        "payment":payment
    }





# Payment History

@router.get("/history")
def payment_history(
    db:Session=Depends(get_db),
    current_user:User=Depends(customer_required)
):

    payments = (
        db.query(Payment)
        .filter(
            Payment.user_id == current_user.id
        )
        .all()
    )


    return payments