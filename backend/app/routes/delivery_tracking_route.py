from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import get_current_user

from app.models.user import User

from app.schemas.delivery_tracking_schema import (
    DeliveryTrackingCreate
)

from app.services.delivery_tracking_service import (
    update_delivery_location,
    get_delivery_tracking,
    complete_delivery
)



router = APIRouter(

    prefix="/delivery-tracking",

    tags=["Delivery Tracking"]

)





# Update Rider Location

@router.post("/update")
def update_location(

    data: DeliveryTrackingCreate,

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_user)

):


    return update_delivery_location(

        data,

        db

    )







# Track Order Location

@router.get("/{order_id}")
def track_order(

    order_id:int,

    db:Session = Depends(get_db),

    current_user:User = Depends(get_current_user)

):


    tracking = get_delivery_tracking(

        order_id,

        db

    )


    if not tracking:

        raise HTTPException(

            status_code=404,

            detail="Tracking details not found"

        )


    return tracking







# Complete Delivery

@router.put("/{order_id}/complete")
def complete_order(

    order_id:int,

    db:Session = Depends(get_db),

    current_user:User = Depends(get_current_user)

):


    tracking = complete_delivery(

        order_id,

        db

    )


    if not tracking:

        raise HTTPException(

            status_code=404,

            detail="Delivery tracking not found"

        )


    return {

        "message":"Delivery completed successfully",

        "status":tracking.delivery_status

    }