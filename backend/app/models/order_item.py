from sqlalchemy import (
    Column,
    Integer,
    Float,
    ForeignKey
)

from sqlalchemy.orm import relationship

from app.config.database import Base


class OrderItem(Base):

    __tablename__ = "order_items"


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


    order = relationship(
        "Order",
        back_populates="items"
    )


    menu = relationship(
        "Menu"
    )