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



class Inventory(Base):

    __tablename__ = "inventory"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    restaurant_id = Column(
        Integer,
        ForeignKey("restaurants.id"),
        nullable=False
    )


    ingredient_name = Column(
        String(100),
        nullable=False
    )


    quantity = Column(
        Float,
        default=0
    )


    unit = Column(
        String(50),
        default="KG"
    )


    minimum_stock = Column(
        Float,
        default=10
    )


    supplier_name = Column(
        String(100),
        nullable=True
    )


    supplier_contact = Column(
        String(20),
        nullable=True
    )


    price = Column(
        Float,
        default=0
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


    restaurant = relationship(
        "Restaurant"
    )