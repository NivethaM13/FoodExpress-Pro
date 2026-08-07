from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.sql import func

from app.config.database import Base



class GroupParticipant(Base):

    __tablename__ = "group_participants"


    id = Column(
        Integer,
        primary_key=True
    )


    group_order_id = Column(
        Integer,
        ForeignKey("group_orders.id"),
        nullable=False
    )


    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )


    joined_at = Column(
        DateTime,
        server_default=func.now()
    )