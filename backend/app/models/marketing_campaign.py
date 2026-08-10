from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from datetime import datetime

from app.config.database import Base



class MarketingCampaign(Base):

    __tablename__ = "marketing_campaigns"



    id = Column(
        Integer,
        primary_key=True,
        index=True
    )



    title = Column(
        String(150),
        nullable=False
    )



    campaign_type = Column(
        String(50),
        nullable=False
    )



    message = Column(
        Text,
        nullable=False
    )



    target_audience = Column(
        String(100),
        nullable=True
    )



    discount_percentage = Column(
        Float,
        default=0
    )



    start_date = Column(
        DateTime,
        nullable=True
    )



    end_date = Column(
        DateTime,
        nullable=True
    )



    status = Column(
        String(50),
        default="ACTIVE"
    )



    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )