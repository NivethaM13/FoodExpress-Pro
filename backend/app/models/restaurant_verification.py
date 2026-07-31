from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.config.database import Base


class RestaurantVerification(Base):

    __tablename__ = "restaurant_verifications"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    restaurant_id = Column(
        Integer,
        ForeignKey("restaurants.id"),
        nullable=False
    )


    gst_number = Column(
        String(50),
        nullable=False
    )


    license_number = Column(
        String(100),
        nullable=False
    )


    gst_document = Column(
        String(255),
        nullable=True
    )


    license_document = Column(
        String(255),
        nullable=True
    )


    verification_status = Column(
        String(50),
        default="PENDING"
    )


    admin_comment = Column(
        String(255),
        nullable=True
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


    restaurant = relationship(
        "Restaurant"
    )