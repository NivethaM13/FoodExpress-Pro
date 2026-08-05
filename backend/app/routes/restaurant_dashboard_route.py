from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import get_current_user

from app.models.user import User

from app.services.restaurant_dashboard_service import (
    get_dashboard_data
)



router = APIRouter(

    prefix="/restaurant/dashboard",

    tags=["Restaurant Dashboard"]

)





@router.get("/")
def restaurant_dashboard(

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_user)

):


    data = get_dashboard_data(

        db,

        current_user.id

    )


    return data