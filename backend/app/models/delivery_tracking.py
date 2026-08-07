from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.config.database import Base



class DeliveryTracking(Base):

    __tablename__ = "delivery_trackings"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    order_id = Column(
        Integer,
        ForeignKey("orders.id"),
        nullable=False
    )


    delivery_partner_id = Column(
        Integer,
        ForeignKey("delivery_partners.id"),
        nullable=False
    )


    latitude = Column(
        Float,
        nullable=True
    )


    longitude = Column(
        Float,
        nullable=True
    )


    current_location = Column(
        String(255),
        nullable=True
    )


    eta_minutes = Column(
        Integer,
        nullable=True
    )


    delivery_status = Column(
        String(50),
        default="ON_THE_WAY"
    )


    completed_at = Column(
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