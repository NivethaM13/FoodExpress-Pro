from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.config.database import Base



class DeliveryEarnings(Base):

    __tablename__ = "delivery_earnings"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    delivery_partner_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )


    daily_earnings = Column(
        Float,
        default=0
    )


    weekly_earnings = Column(
        Float,
        default=0
    )


    incentive_amount = Column(
        Float,
        default=0
    )


    bonus_amount = Column(
        Float,
        default=0
    )


    total_payment = Column(
        Float,
        default=0
    )


    payment_status = Column(
        String(50),
        default="PENDING"
    )


    payment_date = Column(
        DateTime,
        nullable=True
    )


    created_at = Column(
        DateTime,
        server_default=func.now()
    )


    updated_at = Column(
        DateTime,
        onupdate=func.now()
    )