from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.config.database import Base



class Notification(Base):

    __tablename__ = "notifications"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )


    title = Column(
        String(100),
        nullable=False
    )


    message = Column(
        String(500),
        nullable=False
    )


    notification_type = Column(
        String(50),
        nullable=False
    )


    is_read = Column(
        Boolean,
        default=False
    )


    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )


    user = relationship(
        "User"
    )