from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime

from app.config.database import Base


class ChatbotMessage(Base):

    __tablename__ = "chatbot_messages"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    user_id = Column(
        Integer
    )


    user_message = Column(
        Text
    )


    bot_response = Column(
        Text
    )


    category = Column(
        String(50)
    )


    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )