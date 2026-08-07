from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.config.database import Base



class GroupOrder(Base):

    __tablename__ = "group_orders"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    creator_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )


    restaurant_id = Column(
        Integer,
        ForeignKey("restaurants.id"),
        nullable=False
    )


    title = Column(
        String(100),
        nullable=False
    )


    invite_code = Column(
        String(50),
        unique=True,
        nullable=False
    )


    status = Column(
        String(50),
        default="OPEN"
    )


    payment_status = Column(
        String(50),
        default="PENDING"
    )


    created_at = Column(
        DateTime,
        server_default=func.now()
    )