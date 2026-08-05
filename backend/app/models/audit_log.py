from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func

from app.config.database import Base


class AuditLog(Base):

    __tablename__ = "audit_logs"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    user_id = Column(
        Integer,
        nullable=True
    )


    action = Column(
        String(100),
        nullable=False
    )


    module = Column(
        String(100),
        nullable=False
    )


    description = Column(
        Text,
        nullable=True
    )


    ip_address = Column(
        String(50),
        nullable=True
    )


    created_at = Column(
        DateTime,
        server_default=func.now()
    )