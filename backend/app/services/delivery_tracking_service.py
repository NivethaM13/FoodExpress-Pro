from sqlalchemy.orm import Session
from datetime import datetime

from app.models.delivery_tracking import DeliveryTracking

from app.schemas.delivery_tracking_schema import (
    DeliveryTrackingCreate
)





def update_delivery_location(

    data: DeliveryTrackingCreate,

    db: Session

):


    tracking = DeliveryTracking(

        order_id=data.order_id,

        delivery_partner_id=data.delivery_partner_id,

        latitude=data.latitude,

        longitude=data.longitude,

        current_location=data.current_location,

        eta_minutes=data.eta_minutes,

        delivery_status="ON_THE_WAY"

    )


    db.add(tracking)

    db.commit()

    db.refresh(tracking)


    return tracking







def get_delivery_tracking(

    order_id:int,

    db:Session

):


    return (

        db.query(DeliveryTracking)

        .filter(

            DeliveryTracking.order_id == order_id

        )

        .order_by(

            DeliveryTracking.created_at.desc()

        )

        .first()

    )







def complete_delivery(

    order_id:int,

    db:Session

):


    tracking = (

        db.query(DeliveryTracking)

        .filter(

            DeliveryTracking.order_id == order_id

        )

        .order_by(

            DeliveryTracking.created_at.desc()

        )

        .first()

    )



    if tracking:


        tracking.delivery_status = "COMPLETED"

        tracking.completed_at = datetime.now()


        db.commit()

        db.refresh(tracking)



    return tracking