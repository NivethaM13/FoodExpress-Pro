from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import get_current_user

from app.models.user import User

from app.services.admin_dashboard_service import (
    get_admin_dashboard_data
)



router = APIRouter(

    prefix="/admin/dashboard",

    tags=["Admin Dashboard"]

)





@router.get("/")
def admin_dashboard(

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_user)

):


    data = get_admin_dashboard_data(

        db

    )


    return data