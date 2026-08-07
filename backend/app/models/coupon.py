from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Boolean,
    DateTime
)

from sqlalchemy.sql import func

from app.config.database import Base


class Coupon(Base):

    __tablename__ = "coupons"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    code = Column(
        String(50),
        unique=True,
        nullable=False
    )


    description = Column(
        String(255),
        nullable=True
    )


    # REFERRAL / BIRTHDAY / CASHBACK / RESTAURANT / LOYALTY
    coupon_type = Column(
        String(50),
        nullable=False
    )


    discount_type = Column(
        String(50),
        nullable=False
    )


    discount_value = Column(
        Float,
        nullable=False
    )


    min_order_amount = Column(
        Float,
        default=0
    )


    is_free_delivery = Column(
        Boolean,
        default=False
    )


    restaurant_id = Column(
        Integer,
        nullable=True
    )


    usage_limit = Column(
        Integer,
        default=0
    )


    used_count = Column(
        Integer,
        default=0
    )


    is_active = Column(
        Boolean,
        default=True
    )


    expiry_date = Column(
        DateTime,
        nullable=True
    )


    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )