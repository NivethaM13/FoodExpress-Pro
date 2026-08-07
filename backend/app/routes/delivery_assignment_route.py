from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import admin_required

from app.models.user import User

from app.services.delivery_assignment_service import (
    assign_delivery_partner,
    reassign_delivery_partner
)



router = APIRouter(

    prefix="/delivery-assignment",

    tags=["Smart Delivery Assignment"]

)







# Auto Assign Delivery Partner

@router.post("/assign/{order_id}")
def auto_assign_delivery(

    order_id:int,

    db:Session = Depends(get_db),

    current_admin:User = Depends(admin_required)

):


    assignment = assign_delivery_partner(

        order_id,

        db

    )



    if not assignment:


        raise HTTPException(

            status_code=404,

            detail="No delivery partner available"

        )



    return {


        "message":"Delivery partner assigned successfully",


        "assignment_id":assignment.id,


        "order_id":assignment.order_id,


        "delivery_partner_id":assignment.delivery_partner_id,


        "status":assignment.assignment_status


    }








# Reassign Delivery Partner

@router.put("/reassign/{assignment_id}")
def reassign_delivery(

    assignment_id:int,

    db:Session = Depends(get_db),

    current_admin:User = Depends(admin_required)

):


    assignment = reassign_delivery_partner(

        assignment_id,

        db

    )



    if not assignment:


        raise HTTPException(

            status_code=404,

            detail="Assignment not found"

        )



    return {


        "message":"Delivery partner reassigned successfully",


        "assignment_id":assignment.id,


        "status":assignment.assignment_status

    }