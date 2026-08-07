from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import customer_required

from app.models.user import User

from app.schemas.customer_membership_schema import (
    CustomerMembershipCreate
)

from app.services.customer_membership_service import (
    create_membership,
    get_customer_membership,
    get_all_memberships
)



router = APIRouter(

    prefix="/customer-membership",

    tags=["Customer Membership Plans"]

)







# Subscribe Membership

@router.post("/")
def subscribe_membership(

    data: CustomerMembershipCreate,

    db: Session = Depends(get_db),

    current_user: User = Depends(customer_required)

):

    return create_membership(

        data,

        db

    )







# Get Customer Membership

@router.get("/{customer_id}")
def customer_membership(

    customer_id:int,

    db:Session = Depends(get_db),

    current_user:User = Depends(customer_required)

):

    return get_customer_membership(

        customer_id,

        db

    )







# Get All Memberships

@router.get("/")
def all_memberships(

    db:Session = Depends(get_db),

    current_user:User = Depends(customer_required)

):

    return get_all_memberships(

        db

    )