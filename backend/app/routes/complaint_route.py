from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db

from app.schemas.complaint import (
    ComplaintCreate,
    ComplaintResponse,
    ComplaintUpdate
)

from app.services.complaint_service import (
    create_complaint,
    get_customer_complaints,
    get_all_complaints,
    update_complaint
)



router = APIRouter(
    prefix="/complaints",
    tags=["Complaints"]
)





# Raise Complaint

@router.post(
    "/",
    response_model=ComplaintResponse
)
def raise_complaint(
    data: ComplaintCreate,
    db: Session = Depends(get_db)
):

    customer_id = 1   # temporary customer id

    return create_complaint(
        data,
        customer_id,
        db
    )







# Customer Ticket Tracking

@router.get(
    "/customer/{customer_id}",
    response_model=list[ComplaintResponse]
)
def customer_complaints(
    customer_id: int,
    db: Session = Depends(get_db)
):

    return get_customer_complaints(
        customer_id,
        db
    )







# Admin Support Dashboard

@router.get(
    "/",
    response_model=list[ComplaintResponse]
)
def all_complaints(
    db: Session = Depends(get_db)
):

    return get_all_complaints(
        db
    )







# Update Resolution Status

@router.put(
    "/{complaint_id}",
    response_model=ComplaintResponse
)
def update_status(
    complaint_id: int,
    data: ComplaintUpdate,
    db: Session = Depends(get_db)
):

    return update_complaint(
        complaint_id,
        data,
        db
    )