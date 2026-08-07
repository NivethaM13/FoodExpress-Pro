from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime
from datetime import datetime

from app.config.database import Base



class AIRecommendation(Base):

    __tablename__ = "ai_recommendations"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    customer_id = Column(
        Integer,
        nullable=False
    )


    food_name = Column(
        String(100),
        nullable=False
    )


    category = Column(
        String(100),
        nullable=True
    )


    recommendation_type = Column(
        String(100),
        nullable=False
    )


    reason = Column(
        String(255),
        nullable=True
    )


    price = Column(
        Float,
        nullable=True
    )


    is_active = Column(
        Boolean,
        default=True
    )


    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )