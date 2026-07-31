from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    DateTime,
    ForeignKey
)

from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.config.database import Base


class DeliveryPartner(Base):

    __tablename__ = "delivery_partners"


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


    full_name = Column(
        String(150),
        nullable=False
    )


    phone = Column(
        String(15),
        nullable=False
    )


    profile_image = Column(
        String(255),
        nullable=True
    )


    verification_status = Column(
        String(50),
        default="PENDING"
    )


    vehicle_type = Column(
        String(50),
        nullable=True
    )


    vehicle_number = Column(
        String(50),
        nullable=True
    )


    driving_license = Column(
        String(100),
        nullable=True
    )


    is_available = Column(
        Boolean,
        default=False
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


    user = relationship(
        "User"
    )