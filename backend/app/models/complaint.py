from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime

from app.config.database import Base



class Complaint(Base):

    __tablename__ = "complaints"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    customer_id = Column(
        Integer,
        nullable=False
    )


    category = Column(
        String(100),
        nullable=False
    )


    subject = Column(
        String(150),
        nullable=False
    )


    description = Column(
        Text,
        nullable=False
    )


    status = Column(
        String(50),
        default="OPEN"
    )


    resolution_note = Column(
        Text,
        nullable=True
    )


    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )