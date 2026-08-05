from sqlalchemy import (
    Column,
    Integer,
    Float,
    String,
    DateTime,
    ForeignKey
)

from sqlalchemy.sql import func

from app.config.database import Base



class Refund(Base):

    __tablename__ = "refunds"


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


    refund_amount = Column(
        Float,
        nullable=False
    )


    cancellation_reason = Column(
        String(255),
        nullable=False
    )


    refund_status = Column(
        String(50),
        default="PENDING"
    )


    payment_status = Column(
        String(50),
        default="NOT_REVERSED"
    )


    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )


    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )