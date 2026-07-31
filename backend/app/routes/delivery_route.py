from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import delivery_partner_required

from app.models.order import Order
from app.models.user import User
from app.models.delivery_partner import DeliveryPartner


router = APIRouter(
    prefix="/delivery",
    tags=["Delivery Management"]
)



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


    orders = (
        db.query(Order)
        .filter(
            Order.delivery_partner_id == partner.id
        )
        .all()
    )


    return orders