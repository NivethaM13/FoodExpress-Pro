from sqlalchemy import Column, Integer, String, Boolean, Float, DateTime
from datetime import datetime

from app.config.database import Base


class SystemSetting(Base):

    __tablename__ = "system_settings"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    setting_key = Column(
        String(100),
        unique=True,
        nullable=False
    )


    setting_value = Column(
        String(255),
        nullable=False
    )


    setting_type = Column(
        String(50),
        nullable=False
    )


    description = Column(
        String(255)
    )


    is_active = Column(
        Boolean,
        default=True
    )


    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )


    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )