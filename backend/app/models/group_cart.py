from sqlalchemy import Column, Integer, Float, ForeignKey, DateTime
from sqlalchemy.sql import func

from app.config.database import Base



class GroupCart(Base):

    __tablename__ = "group_cart"


    id = Column(
        Integer,
        primary_key=True,
        index=True
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


    menu_id = Column(
        Integer,
        ForeignKey("menus.id"),
        nullable=False
    )


    quantity = Column(
        Integer,
        default=1
    )


    price = Column(
        Float,
        nullable=False
    )


    created_at = Column(
        DateTime,
        server_default=func.now()
    )