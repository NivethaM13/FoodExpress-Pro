from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import (
    customer_required,
    delivery_partner_required
)

from app.models.order_tracking import OrderTracking
from app.models.user import User

from app.schemas.tracking_schema import (
    TrackingCreate,
    TrackingUpdate
)



router = APIRouter(
    prefix="/tracking",
    tags=["Live Order Tracking"]
)





# Create Tracking

@router.post("/")
def create_tracking(
    data: TrackingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(delivery_partner_required)
):

    tracking = OrderTracking(

        order_id=data.order_id,

        delivery_partner_id=data.delivery_partner_id,

        latitude=data.latitude,

        longitude=data.longitude,

        delivery_status=data.delivery_status,

        estimated_time=data.estimated_time,

        route=data.route

    )


    db.add(tracking)

    db.commit()

    db.refresh(tracking)


    return {
        "message": "Tracking created successfully",
        "tracking": tracking
    }





# Customer View Live Tracking

@router.get("/{order_id}")
def get_tracking(
    order_id:int,
    db:Session=Depends(get_db),
    current_user:User=Depends(customer_required)
):

    tracking = (
        db.query(OrderTracking)
        .filter(
            OrderTracking.order_id == order_id
        )
        .first()
    )


    if not tracking:

        raise HTTPException(
            status_code=404,
            detail="Tracking not found"
        )


    return tracking





# Update Delivery Location

@router.put("/{order_id}")
def update_tracking(
    order_id:int,
    data:TrackingUpdate,
    db:Session=Depends(get_db),
    current_user:User=Depends(delivery_partner_required)
):

    tracking = (
        db.query(OrderTracking)
        .filter(
            OrderTracking.order_id == order_id
        )
        .first()
    )


    if not tracking:

        raise HTTPException(
            status_code=404,
            detail="Tracking not found"
        )


    for key,value in data.dict(exclude_unset=True).items():

        setattr(
            tracking,
            key,
            value
        )


    db.commit()

    db.refresh(tracking)


    return {
        "message":"Tracking updated",
        "tracking":tracking
    }