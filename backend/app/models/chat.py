from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.config.database import Base



class Chat(Base):

    __tablename__ = "chats"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    sender_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )


    receiver_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )


    message = Column(
        String(1000),
        nullable=True
    )


    image_url = Column(
        String(500),
        nullable=True
    )


    chat_type = Column(
        String(50),
        nullable=False
    )


    is_read = Column(
        String(20),
        default="UNREAD"
    )


    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )


    sender = relationship(
        "User",
        foreign_keys=[sender_id]
    )


    receiver = relationship(
        "User",
        foreign_keys=[receiver_id]
    )