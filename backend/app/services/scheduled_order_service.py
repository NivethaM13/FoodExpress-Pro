from datetime import timedelta

from sqlalchemy.orm import Session

from app.models.scheduled_order import ScheduledOrder
from app.schemas.scheduled_order_schema import ScheduledOrderCreate





# Create Scheduled Order

def create_scheduled_order(
    data: ScheduledOrderCreate,
    user_id: int,
    db: Session
):

    next_date = None


    # Recurring Order Logic

    if data.recurring_type == "DAILY":

        next_date = (
            data.scheduled_date
            +
            timedelta(days=1)
        )


    elif data.recurring_type == "WEEKLY":

        next_date = (
            data.scheduled_date
            +
            timedelta(days=7)
        )


    elif data.recurring_type == "MONTHLY":

        next_date = (
            data.scheduled_date
            +
            timedelta(days=30)
        )





    scheduled_order = ScheduledOrder(

        user_id=user_id,

        restaurant_id=data.restaurant_id,

        scheduled_date=data.scheduled_date,

        scheduled_time=data.scheduled_time,

        recurring_type=data.recurring_type,

        reminder_time=data.reminder_time,

        next_delivery_date=next_date,

        status="SCHEDULED"

    )



    db.add(scheduled_order)

    db.commit()

    db.refresh(scheduled_order)


    return scheduled_order







# Get Customer Scheduled Orders

def get_user_scheduled_orders(
    user_id: int,
    db: Session
):

    return (

        db.query(ScheduledOrder)

        .filter(
            ScheduledOrder.user_id == user_id
        )

        .all()

    )







# Get Single Scheduled Order

def get_scheduled_order(
    order_id: int,
    user_id: int,
    db: Session
):

    return (

        db.query(ScheduledOrder)

        .filter(

            ScheduledOrder.id == order_id,

            ScheduledOrder.user_id == user_id

        )

        .first()

    )








# Cancel Scheduled Order

def cancel_scheduled_order(
    order_id: int,
    user_id: int,
    db: Session
):

    scheduled_order = get_scheduled_order(

        order_id,

        user_id,

        db

    )


    if scheduled_order:


        scheduled_order.status = "CANCELLED"


        db.commit()

        db.refresh(scheduled_order)



    return scheduled_order