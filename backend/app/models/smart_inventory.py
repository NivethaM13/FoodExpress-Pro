from sqlalchemy import Column, Integer, String, Float, Date, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.config.database import Base



class SmartInventory(Base):

    __tablename__ = "smart_inventories"


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
        String(255),
        nullable=False
    )


    current_stock = Column(
        Float,
        default=0
    )


    minimum_stock = Column(
        Float,
        default=0
    )


    unit = Column(
        String(50),
        nullable=True
    )


    low_stock_status = Column(
        String(50),
        default="AVAILABLE"
    )


    purchase_suggestion = Column(
        String(255),
        nullable=True
    )


    expiry_date = Column(
        Date,
        nullable=True
    )


    expiry_status = Column(
        String(50),
        default="SAFE"
    )


    created_at = Column(
        DateTime,
        server_default=func.now()
    )


    updated_at = Column(
        DateTime,
        onupdate=func.now()
    )