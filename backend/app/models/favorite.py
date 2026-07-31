from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

from app.config.database import Base


class FavoriteRestaurant(Base):

    __tablename__ = "favorite_restaurants"


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


    restaurant_id = Column(
        Integer,
        ForeignKey("restaurants.id"),
        nullable=False
    )


    user = relationship(
        "User"
    )


    restaurant = relationship(
        "Restaurant"
    )