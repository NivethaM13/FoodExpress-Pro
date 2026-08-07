from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, ForeignKey
from sqlalchemy.sql import func

from app.config.database import Base



class CustomerMembership(Base):

    __tablename__ = "customer_memberships"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    customer_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )


    membership_type = Column(
        String(50),
        default="SILVER"
    )


    membership_price = Column(
        Float,
        default=0
    )


    discount_percentage = Column(
        Float,
        default=0
    )


    free_delivery = Column(
        Boolean,
        default=False
    )


    exclusive_benefits = Column(
        String(255),
        nullable=True
    )


    membership_status = Column(
        String(50),
        default="ACTIVE"
    )


    start_date = Column(
        DateTime,
        server_default=func.now()
    )


    expiry_date = Column(
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