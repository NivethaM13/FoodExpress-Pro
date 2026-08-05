from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import get_current_user

from app.models.user import User

from app.services.delivery_dashboard_service import (
    get_delivery_dashboard_data
)



router = APIRouter(

    prefix="/delivery/dashboard",

    tags=["Delivery Dashboard"]

)





@router.get("/")
def delivery_dashboard(

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_user)

):


    data = get_delivery_dashboard_data(

        db,

        current_user.id

    )


    return data