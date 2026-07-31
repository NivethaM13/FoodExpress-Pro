from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import (
    delivery_partner_required,
    restaurant_owner_required
)

from app.models.order import Order
from app.models.user import User
from app.models.delivery_partner import DeliveryPartner


router = APIRouter(
    prefix="/delivery",
    tags=["Delivery Management"]
)



# Assign Delivery Partner To Order

@router.put("/assign/{order_id}/{partner_id}")
def assign_delivery(
    order_id: int,
    partner_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(restaurant_owner_required)
):

    order = (
        db.query(Order)
        .filter(
            Order.id == order_id
        )
        .first()
    )


    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )


    partner = (
        db.query(DeliveryPartner)
        .filter(
            DeliveryPartner.id == partner_id
        )
        .first()
    )


    if not partner:
        raise HTTPException(
            status_code=404,
            detail="Delivery partner not found"
        )


    order.delivery_partner_id = partner.id

    order.order_status = "OUT_FOR_DELIVERY"


    db.commit()


    return {
        "message": "Delivery partner assigned successfully"
    }





# View Assigned Deliveries

@router.get("/orders")
def assigned_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(delivery_partner_required)
):

    partner = (
        db.query(DeliveryPartner)
        .filter(
            DeliveryPartner.user_id == current_user.id
        )
        .first()
    )


    if not partner:
        raise HTTPException(
            status_code=404,
            detail="Delivery profile not found"
        )


    orders = (
        db.query(Order)
        .filter(
            Order.delivery_partner_id == partner.id
        )
        .all()
    )


    return orders





# Delivery Completed

@router.put("/orders/{order_id}/delivered")
def delivered_order(
    order_id:int,
    db:Session=Depends(get_db),
    current_user:User=Depends(delivery_partner_required)
):

    order = (
        db.query(Order)
        .filter(
            Order.id == order_id
        )
        .first()
    )


    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )


    order.order_status = "DELIVERED"


    db.commit()


    return {
        "message":"Order delivered successfully"
    }