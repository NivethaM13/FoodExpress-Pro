from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.config.database import Base



class Review(Base):

    __tablename__ = "reviews"


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


    restaurant_rating = Column(
        Float,
        nullable=False
    )


    food_rating = Column(
        Float,
        nullable=False
    )


    delivery_rating = Column(
        Float,
        nullable=False
    )


    comment = Column(
        String(500),
        nullable=True
    )


    status = Column(
        String(50),
        default="ACTIVE"
    )


    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
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