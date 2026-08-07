from sqlalchemy.orm import Session

from app.models.table_reservation import TableReservation

from app.schemas.table_reservation_schema import (
    TableReservationCreate
)





def create_reservation(

    data: TableReservationCreate,

    user_id: int,

    db: Session

):


    reservation = TableReservation(

        user_id=user_id,

        restaurant_id=data.restaurant_id,

        reservation_date=data.reservation_date,

        reservation_time=data.reservation_time,

        seats=data.seats,

        status="CONFIRMED"

    )


    db.add(reservation)

    db.commit()

    db.refresh(reservation)


    return reservation






def get_user_reservations(

    user_id:int,

    db:Session

):


    return (

        db.query(TableReservation)

        .filter(

            TableReservation.user_id == user_id

        )

        .all()

    )






def cancel_reservation(

    reservation_id:int,

    user_id:int,

    db:Session

):


    reservation = (

        db.query(TableReservation)

        .filter(

            TableReservation.id == reservation_id,

            TableReservation.user_id == user_id

        )

        .first()

    )


    if reservation:

        reservation.status = "CANCELLED"

        db.commit()

        db.refresh(reservation)


    return reservation