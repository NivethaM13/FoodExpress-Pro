from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import restaurant_owner_required

from app.models.user import User

from app.schemas.restaurant_staff_schema import (
    RestaurantStaffCreate
)

from app.services.restaurant_staff_service import (
    create_staff,
    get_restaurant_staff,
    update_attendance
)



router = APIRouter(

    prefix="/restaurant-staff",

    tags=["Restaurant Staff Management"]

)





# Register Staff

@router.post("/")
def add_staff(

    data: RestaurantStaffCreate,

    db: Session = Depends(get_db),

    current_user: User = Depends(restaurant_owner_required)

):

    return create_staff(

        data,

        db

    )







# View Staff List

@router.get("/{restaurant_id}")
def staff_list(

    restaurant_id:int,

    db:Session = Depends(get_db),

    current_user:User = Depends(restaurant_owner_required)

):

    return get_restaurant_staff(

        restaurant_id,

        db

    )







# Update Attendance

@router.put("/{staff_id}/attendance")
def attendance_update(

    staff_id:int,

    status:str,

    db:Session = Depends(get_db),

    current_user:User = Depends(restaurant_owner_required)

):

    return update_attendance(

        staff_id,

        status,

        db

    )