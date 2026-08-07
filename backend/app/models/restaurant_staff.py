from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float
from sqlalchemy.sql import func

from app.config.database import Base



class RestaurantStaff(Base):

    __tablename__ = "restaurant_staffs"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    restaurant_id = Column(
        Integer,
        ForeignKey("restaurants.id"),
        nullable=False
    )


    staff_name = Column(
        String(255),
        nullable=False
    )


    phone = Column(
        String(20),
        nullable=True
    )


    email = Column(
        String(255),
        nullable=True
    )


    role = Column(
        String(100),
        default="STAFF"
    )


    shift = Column(
        String(100),
        nullable=True
    )


    attendance_status = Column(
        String(50),
        default="PRESENT"
    )


    performance_score = Column(
        Float,
        default=0
    )


    created_at = Column(
        DateTime,
        server_default=func.now()
    )


    updated_at = Column(
        DateTime,
        onupdate=func.now()
    )