from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.config.database import Base



class RestaurantFinance(Base):

    __tablename__ = "restaurant_finances"


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


    total_revenue = Column(
        Float,
        default=0
    )


    total_expense = Column(
        Float,
        default=0
    )


    profit_amount = Column(
        Float,
        default=0
    )


    tax_amount = Column(
        Float,
        default=0
    )


    financial_status = Column(
        String(50),
        default="ACTIVE"
    )


    report_period = Column(
        String(100),
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