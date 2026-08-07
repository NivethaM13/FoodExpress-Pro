from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.config.database import Base



class AIDemandPrediction(Base):

    __tablename__ = "ai_demand_predictions"


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


    peak_hour = Column(
        String(50),
        nullable=True
    )


    demand_level = Column(
        String(50),
        default="MEDIUM"
    )


    predicted_orders = Column(
        Integer,
        default=0
    )


    popular_food = Column(
        String(255),
        nullable=True
    )


    inventory_suggestion = Column(
        String(255),
        nullable=True
    )


    seasonal_trend = Column(
        String(255),
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