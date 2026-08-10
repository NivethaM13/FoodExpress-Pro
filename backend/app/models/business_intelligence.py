from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime

from app.config.database import Base



class BusinessAnalytics(Base):

    __tablename__ = "business_analytics"

    __table_args__ = {
        "extend_existing": True
    }



    id = Column(
        Integer,
        primary_key=True,
        index=True
    )



    metric_type = Column(
        String(100),
        nullable=False
    )



    total_customers = Column(
        Integer,
        default=0
    )



    customer_retention_rate = Column(
        Float,
        default=0
    )



    total_restaurants = Column(
        Integer,
        default=0
    )



    restaurant_growth_rate = Column(
        Float,
        default=0
    )



    total_deliveries = Column(
        Integer,
        default=0
    )



    delivery_success_rate = Column(
        Float,
        default=0
    )



    average_delivery_time = Column(
        Float,
        default=0
    )



    total_revenue = Column(
        Float,
        default=0
    )



    revenue_forecast = Column(
        Float,
        default=0
    )



    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )