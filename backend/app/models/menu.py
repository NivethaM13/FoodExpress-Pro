from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Boolean,
    Float,
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.config.database import Base



class Menu(Base):

    __tablename__ = "menus"


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


    name = Column(
        String(150),
        nullable=False
    )


    description = Column(
        Text,
        nullable=True
    )


    category = Column(
        String(100),
        nullable=False
    )


    # Module 6: Veg / Non-Veg
    food_type = Column(
        String(20),
        default="VEG"
    )


    price = Column(
        Float,
        nullable=False
    )


    image = Column(
        String(255),
        nullable=True
    )


    is_available = Column(
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


    restaurant = relationship(
        "Restaurant"
    )