from sqlalchemy.orm import Session

from app.models.refund import Refund



# Create Refund Request

def create_refund(
    db: Session,
    data
):

    refund = Refund(

        order_id=data.order_id,

        user_id=data.user_id,

        refund_amount=data.refund_amount,

        cancellation_reason=data.cancellation_reason,

        refund_status="PENDING",

        payment_status="NOT_REVERSED"

    )


    db.add(refund)

    db.commit()

    db.refresh(refund)


    return refund






# Get All Refund Requests

def get_all_refunds(
    db: Session
):

    return (

        db.query(Refund)

        .order_by(

            Refund.created_at.desc()

        )

        .all()

    )







# Get User Refunds

def get_user_refunds(

    db: Session,

    user_id:int

):

    return (

        db.query(Refund)

        .filter(

            Refund.user_id == user_id

        )

        .all()

    )







# Approve Refund

def approve_refund(

    db: Session,

    refund_id:int

):

    refund = (

        db.query(Refund)

        .filter(

            Refund.id == refund_id

        )

        .first()

    )


    if refund:

        refund.refund_status = "APPROVED"

        refund.payment_status = "REVERSED"


        db.commit()

        db.refresh(refund)


    return refund







# Reject Refund

def reject_refund(

    db: Session,

    refund_id:int

):

    refund = (

        db.query(Refund)

        .filter(

            Refund.id == refund_id

        )

        .first()

    )


    if refund:

        refund.refund_status = "REJECTED"


        db.commit()

        db.refresh(refund)


    return refund