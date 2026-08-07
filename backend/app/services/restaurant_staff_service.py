from sqlalchemy.orm import Session

from app.models.restaurant_staff import RestaurantStaff

from app.schemas.restaurant_staff_schema import (
    RestaurantStaffCreate
)





def create_staff(

    data: RestaurantStaffCreate,

    db: Session

):


    staff = RestaurantStaff(

        restaurant_id=data.restaurant_id,

        staff_name=data.staff_name,

        phone=data.phone,

        email=data.email,

        role=data.role,

        shift=data.shift,

        attendance_status=data.attendance_status,

        performance_score=data.performance_score

    )


    db.add(staff)

    db.commit()

    db.refresh(staff)


    return staff







def get_restaurant_staff(

    restaurant_id:int,

    db:Session

):


    return (

        db.query(RestaurantStaff)

        .filter(

            RestaurantStaff.restaurant_id == restaurant_id

        )

        .order_by(

            RestaurantStaff.created_at.desc()

        )

        .all()

    )







def update_attendance(

    staff_id:int,

    status:str,

    db:Session

):


    staff = (

        db.query(RestaurantStaff)

        .filter(

            RestaurantStaff.id == staff_id

        )

        .first()

    )


    if staff:

        staff.attendance_status = status

        db.commit()

        db.refresh(staff)


    return staff