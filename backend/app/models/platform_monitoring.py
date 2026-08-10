from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func

from app.config.database import Base


class PlatformMonitoring(Base):

    __tablename__ = "platform_monitoring"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    monitor_type = Column(
        String(100),
        nullable=False
    )


    title = Column(
        String(150),
        nullable=False
    )


    description = Column(
        String(255),
        nullable=True
    )


    api_status = Column(
        String(50),
        default="RUNNING"
    )


    server_health = Column(
        String(50),
        default="HEALTHY"
    )


    failed_requests = Column(
        Integer,
        default=0
    )


    security_alert = Column(
        Boolean,
        default=False
    )


    audit_monitoring = Column(
        Boolean,
        default=False
    )


    backup_status = Column(
        String(50),
        default="COMPLETED"
    )


    recovery_status = Column(
        String(50),
        default="READY"
    )


    created_at = Column(
        DateTime,
        server_default=func.now()
    )