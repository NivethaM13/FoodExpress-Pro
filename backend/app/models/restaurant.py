from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Boolean,
    DateTime,
    ForeignKey,
)

from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.config.database import Base


class Restaurant(Base):

    __tablename__ = "restaurants"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    owner_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )


    name = Column(
        String(150),
        nullable=False
    )


    description = Column(
        Text,
        nullable=True
    )


    cuisine = Column(
        String(100),
        nullable=False
    )


    address = Column(
        Text,
        nullable=False
    )


    city = Column(
        String(100),
        nullable=False
    )


    state = Column(
        String(100),
        nullable=False
    )


    pincode = Column(
        String(10),
        nullable=False
    )


    phone = Column(
        String(15),
        nullable=False
    )


    email = Column(
        String(150),
        nullable=True
    )


    image = Column(
        String(255),
        nullable=True
    )


    opening_time = Column(
        String(20),
        nullable=True
    )


    closing_time = Column(
        String(20),
        nullable=True
    )


    # Module 4: Delivery Radius
    delivery_radius = Column(
        Integer,
        default=5
    )


    is_active = Column(
        Boolean,
        default=True
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


    owner = relationship(
        "User"
    )