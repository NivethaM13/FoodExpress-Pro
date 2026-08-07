from sqlalchemy import Column, Integer, String, Boolean, Date, Time, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.config.database import Base



class ScheduledOrder(Base):

    __tablename__ = "scheduled_orders"


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


    order_id = Column(
        Integer,
        ForeignKey("orders.id"),
        nullable=True
    )


    scheduled_date = Column(
        Date,
        nullable=False
    )


    scheduled_time = Column(
        Time,
        nullable=False
    )


    recurring_type = Column(
        String(50),
        default="NONE"
    )


    status = Column(
        String(50),
        default="SCHEDULED"
    )


    reminder_sent = Column(
        Boolean,
        default=False
    )


    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )


    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )


    next_delivery_date = Column(
    Date,
    nullable=True
    )


    reminder_time = Column(
    Integer,
    default=30
    )

    user = relationship(
        "User"
    )


    restaurant = relationship(
        "Restaurant"
    )


    order = relationship(
        "Order"
    )