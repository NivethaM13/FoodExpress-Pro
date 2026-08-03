from sqlalchemy import (
    Column,
    Integer,
    Float,
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.config.database import Base



class Wallet(Base):

    __tablename__ = "wallets"


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


    balance = Column(
        Float,
        default=0
    )


    reward_points = Column(
        Integer,
        default=0
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