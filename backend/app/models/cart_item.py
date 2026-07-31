from sqlalchemy import (
    Column,
    Integer,
    Float,
    ForeignKey
)

from sqlalchemy.orm import relationship

from app.config.database import Base


class CartItem(Base):

    __tablename__ = "cart_items"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    cart_id = Column(
        Integer,
        ForeignKey("carts.id"),
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


    # Link with Cart
    cart = relationship(
        "Cart",
        back_populates="items"
    )


    # Link with Menu
    menu = relationship(
        "Menu"
    )