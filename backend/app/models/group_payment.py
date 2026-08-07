from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.config.database import Base



class GroupPayment(Base):

    __tablename__ = "group_payments"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    group_order_id = Column(
        Integer,
        ForeignKey("group_orders.id"),
        nullable=False
    )


    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )


    amount = Column(
        Float,
        nullable=False
    )


    payment_status = Column(
        String(50),
        default="PENDING"
    )


    payment_method = Column(
        String(50),
        nullable=True
    )


    created_at = Column(
        DateTime,
        server_default=func.now()
    )