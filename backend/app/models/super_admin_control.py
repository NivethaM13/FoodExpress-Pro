from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func

from app.config.database import Base


class SuperAdminControl(Base):

    __tablename__ = "super_admin_controls"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    admin_name = Column(
        String(100),
        nullable=False
    )


    control_type = Column(
        String(100),
        nullable=False
    )


    description = Column(
        String(255),
        nullable=True
    )


    manage_restaurants = Column(
        Boolean,
        default=False
    )


    manage_customers = Column(
        Boolean,
        default=False
    )


    manage_delivery_partners = Column(
        Boolean,
        default=False
    )


    platform_settings = Column(
        Boolean,
        default=False
    )


    system_monitoring = Column(
        Boolean,
        default=False
    )


    user_verification = Column(
        Boolean,
        default=False
    )


    status = Column(
        String(50),
        default="ACTIVE"
    )


    created_at = Column(
        DateTime,
        server_default=func.now()
    )