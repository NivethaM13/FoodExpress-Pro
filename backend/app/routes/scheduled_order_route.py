from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import customer_required

from app.models.user import User

from app.schemas.scheduled_order_schema import (
    ScheduledOrderCreate
)

from app.services.scheduled_order_service import (
    create_scheduled_order,
    get_user_scheduled_orders,
    get_scheduled_order,
    cancel_scheduled_order
)



router = APIRouter(
    prefix="/scheduled-orders",
    tags=["Scheduled Orders"]
)





# Create Scheduled Order

@router.post("/")
def schedule_order(

    data: ScheduledOrderCreate,

    db: Session = Depends(get_db),

    current_user: User = Depends(customer_required)

):

    return create_scheduled_order(

        data,

        current_user.id,

        db

    )







# View Customer Scheduled Orders

@router.get("/")
def my_scheduled_orders(

    db: Session = Depends(get_db),

    current_user: User = Depends(customer_required)

):

    return get_user_scheduled_orders(

        current_user.id,

        db

    )







# View Single Scheduled Order

@router.get("/{schedule_id}")
def view_schedule(

    schedule_id:int,

    db: Session = Depends(get_db),

    current_user: User = Depends(customer_required)

):

    schedule = get_scheduled_order(

        schedule_id,

        current_user.id,

        db

    )


    if not schedule:

        raise HTTPException(

            status_code=404,

            detail="Scheduled order not found"

        )


    return schedule







# Cancel Scheduled Order

@router.put("/{schedule_id}/cancel")
def cancel_schedule(

    schedule_id:int,

    db: Session = Depends(get_db),

    current_user: User = Depends(customer_required)

):

    schedule = cancel_scheduled_order(

        schedule_id,

        current_user.id,

        db

    )


    if not schedule:

        raise HTTPException(

            status_code=404,

            detail="Scheduled order not found"

        )


    return {

        "message":
        "Scheduled order cancelled successfully"

    }