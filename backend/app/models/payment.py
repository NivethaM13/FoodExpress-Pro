from sqlalchemy import (
    Column,
    Integer,
    Float,
    String,
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.config.database import Base



class Payment(Base):

    __tablename__ = "payments"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    order_id = Column(
        Integer,
        ForeignKey("orders.id"),
        nullable=False
    )


    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )


    payment_method = Column(
        String(50),
        nullable=False
    )


    payment_status = Column(
        String(50),
        default="PENDING"
    )


    transaction_id = Column(
        String(100),
        nullable=True
    )


    amount = Column(
        Float,
        nullable=False
    )


    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )


    order = relationship(
        "Order"
    )


    user = relationship(
        "User"
    )