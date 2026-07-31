from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Boolean,
    DateTime,
    ForeignKey
)

from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.config.database import Base


class MenuAddon(Base):

    __tablename__ = "menu_addons"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    menu_id = Column(
        Integer,
        ForeignKey("menus.id"),
        nullable=False
    )


    addon_name = Column(
        String(100),
        nullable=False
    )


    addon_price = Column(
        Float,
        nullable=False
    )


    is_available = Column(
        Boolean,
        default=True
    )


    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )


    menu = relationship(
        "Menu"
    )