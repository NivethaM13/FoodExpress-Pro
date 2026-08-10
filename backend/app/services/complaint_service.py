from sqlalchemy.orm import Session

from app.models.complaint import Complaint
from app.schemas.complaint import (
    ComplaintCreate,
    ComplaintUpdate
)



# Create Complaint

def create_complaint(
    data: ComplaintCreate,
    customer_id: int,
    db: Session
):

    complaint = Complaint(

        customer_id=customer_id,

        category=data.category,

        subject=data.subject,

        description=data.description

    )


    db.add(complaint)

    db.commit()

    db.refresh(complaint)


    return complaint






# Get Customer Complaints

def get_customer_complaints(
    customer_id: int,
    db: Session
):

    return db.query(Complaint).filter(
        Complaint.customer_id == customer_id
    ).all()






# Get All Complaints (Admin)

def get_all_complaints(
    db: Session
):

    return db.query(Complaint).all()






# Update Complaint Status

def update_complaint(
    complaint_id: int,
    data: ComplaintUpdate,
    db: Session
):

    complaint = db.query(Complaint).filter(
        Complaint.id == complaint_id
    ).first()



    if not complaint:

        return None



    if data.status:

        complaint.status = data.status



    if data.resolution_note:

        complaint.resolution_note = data.resolution_note



    db.commit()

    db.refresh(complaint)


    return complaint