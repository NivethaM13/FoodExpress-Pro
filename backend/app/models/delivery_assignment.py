from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.config.database import Base



class DeliveryAssignment(Base):

    __tablename__ = "delivery_assignments"


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


    distance_km = Column(
        Float,
        nullable=True
    )


    delivery_load = Column(
        Integer,
        default=0
    )


    assignment_status = Column(
        String(50),
        default="ASSIGNED"
    )


    assigned_at = Column(
        DateTime,
        server_default=func.now()
    )


    updated_at = Column(
        DateTime,
        onupdate=func.now()
    )