from sqlalchemy import (
    Column,
    Integer,
    Float,
    String,
    DateTime,
    ForeignKey
)

from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.config.database import Base



class OrderTracking(Base):

    __tablename__ = "order_tracking"


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
        nullable=True
    )


    latitude = Column(
        Float,
        nullable=True
    )


    longitude = Column(
        Float,
        nullable=True
    )


    delivery_status = Column(
        String(50),
        default="PENDING"
    )


    estimated_time = Column(
        String(50),
        nullable=True
    )


    route = Column(
        String(255),
        nullable=True
    )


    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )


    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )


    order = relationship(
        "Order"
    )


    delivery_partner = relationship(
        "DeliveryPartner"
    )