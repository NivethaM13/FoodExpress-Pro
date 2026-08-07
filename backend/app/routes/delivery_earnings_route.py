from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import delivery_partner_required

from app.models.user import User

from app.schemas.delivery_earnings_schema import (
    DeliveryEarningsCreate
)

from app.services.delivery_earnings_service import (
    create_earnings,
    get_partner_earnings,
    update_payment_status
)



router = APIRouter(

    prefix="/delivery-earnings",

    tags=["Delivery Partner Earnings"]

)





# Create Earnings

@router.post("/")
def add_earnings(

    data: DeliveryEarningsCreate,

    db: Session = Depends(get_db),

    current_user: User = Depends(delivery_partner_required)

):

    return create_earnings(

        data,

        db

    )







# View Earnings History

@router.get("/{delivery_partner_id}")
def earnings_history(

    delivery_partner_id:int,

    db:Session = Depends(get_db),

    current_user:User = Depends(delivery_partner_required)

):

    return get_partner_earnings(

        delivery_partner_id,

        db

    )







# Update Payment Status

@router.put("/{earnings_id}/payment")
def payment_update(

    earnings_id:int,

    status:str,

    db:Session = Depends(get_db),

    current_user:User = Depends(delivery_partner_required)

):

    return update_payment_status(

        earnings_id,

        status,

        db

    )