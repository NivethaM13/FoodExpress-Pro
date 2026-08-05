from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey
)

from sqlalchemy.sql import func

from app.config.database import Base



class Branch(Base):

    __tablename__ = "branches"


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


    manager_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=True
    )


    branch_name = Column(
        String(100),
        nullable=False
    )


    location = Column(
        String(255),
        nullable=False
    )


    phone = Column(
        String(20),
        nullable=True
    )


    status = Column(
        String(50),
        default="ACTIVE"
    )


    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )