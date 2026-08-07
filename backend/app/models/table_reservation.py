from sqlalchemy import Column, Integer, String, Date, Time, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.config.database import Base



class TableReservation(Base):

    __tablename__ = "table_reservations"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )


    restaurant_id = Column(
        Integer,
        ForeignKey("restaurants.id"),
        nullable=False
    )


    reservation_date = Column(
        Date,
        nullable=False
    )


    reservation_time = Column(
        Time,
        nullable=False
    )


    seats = Column(
        Integer,
        nullable=False
    )


    status = Column(
        String(50),
        default="CONFIRMED"
    )


    created_at = Column(
        DateTime,
        server_default=func.now()
    )