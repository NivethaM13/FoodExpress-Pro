from sqlalchemy.orm import Session
from datetime import datetime

from app.models.delivery_earnings import DeliveryEarnings

from app.schemas.delivery_earnings_schema import (
    DeliveryEarningsCreate
)





def create_earnings(

    data: DeliveryEarningsCreate,

    db: Session

):


    total = (

        data.daily_earnings +

        data.incentive_amount +

        data.bonus_amount

    )


    earnings = DeliveryEarnings(

        delivery_partner_id=data.delivery_partner_id,

        daily_earnings=data.daily_earnings,

        weekly_earnings=data.weekly_earnings,

        incentive_amount=data.incentive_amount,

        bonus_amount=data.bonus_amount,

        total_payment=total,

        payment_status=data.payment_status

    )


    db.add(earnings)

    db.commit()

    db.refresh(earnings)


    return earnings







def get_partner_earnings(

    delivery_partner_id:int,

    db:Session

):


    return (

        db.query(DeliveryEarnings)

        .filter(

            DeliveryEarnings.delivery_partner_id == delivery_partner_id

        )

        .order_by(

            DeliveryEarnings.created_at.desc()

        )

        .all()

    )







def update_payment_status(

    earnings_id:int,

    status:str,

    db:Session

):


    earnings = (

        db.query(DeliveryEarnings)

        .filter(

            DeliveryEarnings.id == earnings_id

        )

        .first()

    )


    if earnings:

        earnings.payment_status = status

        earnings.payment_date = datetime.now()


        db.commit()

        db.refresh(earnings)


    return earnings