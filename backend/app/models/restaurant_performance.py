from sqlalchemy import Column, Integer, Float, String, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.config.database import Base



class RestaurantPerformance(Base):

    __tablename__ = "restaurant_performances"


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


    daily_sales = Column(
        Float,
        default=0
    )


    weekly_revenue = Column(
        Float,
        default=0
    )


    monthly_revenue = Column(
        Float,
        default=0
    )


    popular_dish = Column(
        String(255),
        nullable=True
    )


    customer_growth = Column(
        Integer,
        default=0
    )


    created_at = Column(
        DateTime,
        server_default=func.now()
    )


    updated_at = Column(
        DateTime,
        onupdate=func.now()
    )