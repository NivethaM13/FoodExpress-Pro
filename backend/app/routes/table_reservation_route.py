from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import customer_required

from app.models.user import User

from app.schemas.table_reservation_schema import (
    TableReservationCreate
)

from app.services.table_reservation_service import (
    create_reservation,
    get_user_reservations,
    cancel_reservation
)



router = APIRouter(
    prefix="/table-reservations",
    tags=["Table Reservation"]
)





# Book Table

@router.post("/")
def book_table(

    data: TableReservationCreate,

    db: Session = Depends(get_db),

    current_user: User = Depends(customer_required)

):


    return create_reservation(

        data,

        current_user.id,

        db

    )







# Reservation History

@router.get("/")
def reservation_history(

    db: Session = Depends(get_db),

    current_user: User = Depends(customer_required)

):


    return get_user_reservations(

        current_user.id,

        db

    )








# Cancel Reservation

@router.put("/{reservation_id}/cancel")
def cancel_table(

    reservation_id:int,

    db:Session = Depends(get_db),

    current_user:User = Depends(customer_required)

):


    reservation = cancel_reservation(

        reservation_id,

        current_user.id,

        db

    )


    if not reservation:

        raise HTTPException(

            status_code=404,

            detail="Reservation not found"

        )


    return {

        "message":"Reservation cancelled successfully"

    }