from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime

from app.config.database import Base


class BusinessAnalytics(Base):

    __tablename__ = "business_analytics"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    metric_type = Column(
        String(100),
        nullable=False
    )


    metric_name = Column(
        String(150),
        nullable=False
    )


    value = Column(
        Float,
        nullable=False
    )


    description = Column(
        String(255)
    )


    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )