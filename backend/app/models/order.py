from sqlalchemy import (
    Column,
    Integer,
    Float,
    String,
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.config.database import Base



class Order(Base):

    __tablename__ = "orders"


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


    delivery_partner_id = Column(
        Integer,
        ForeignKey("delivery_partners.id"),
        nullable=True
    )


    total_amount = Column(
        Float,
        nullable=False
    )


    order_status = Column(
        String(50),
        default="PLACED"
    )


    delivery_address = Column(
        String(255),
        nullable=True
    )


    payment_status = Column(
        String(50),
        default="PENDING"
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



    # Relationships

    items = relationship(
        "OrderItem",
        cascade="all, delete"
    )


    delivery_partner = relationship(
        "DeliveryPartner"
    )


    user = relationship(
        "User"
    )


    restaurant = relationship(
        "Restaurant"
    )