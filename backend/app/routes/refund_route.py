from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db

from app.schemas.refund_schema import (
    RefundCreate,
    RefundUpdate
)

from app.services.refund_service import (
    create_refund,
    get_all_refunds,
    get_user_refunds,
    approve_refund,
    reject_refund
)



router = APIRouter(

    prefix="/refunds",

    tags=["Refunds"]

)





# Create Refund Request

@router.post("/")
def request_refund(

    data: RefundCreate,

    db: Session = Depends(get_db)

):

    return create_refund(

        db,

        data

    )







# Admin View All Refunds

@router.get("/")
def all_refunds(

    db: Session = Depends(get_db)

):

    return get_all_refunds(db)







# Customer Refund Tracking

@router.get("/user/{user_id}")
def user_refunds(

    user_id:int,

    db: Session = Depends(get_db)

):

    return get_user_refunds(

        db,

        user_id

    )







# Approve Refund

@router.put("/{refund_id}/approve")
def approve(

    refund_id:int,

    db: Session = Depends(get_db)

):

    refund = approve_refund(

        db,

        refund_id

    )


    if not refund:

        raise HTTPException(

            status_code=404,

            detail="Refund not found"

        )


    return {

        "message":"Refund approved successfully",

        "refund":refund

    }







# Reject Refund

@router.put("/{refund_id}/reject")
def reject(

    refund_id:int,

    db: Session = Depends(get_db)

):

    refund = reject_refund(

        db,

        refund_id

    )


    if not refund:

        raise HTTPException(

            status_code=404,

            detail="Refund not found"

        )


    return {

        "message":"Refund rejected",

        "refund":refund

    }