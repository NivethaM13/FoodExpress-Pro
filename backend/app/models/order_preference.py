from sqlalchemy import Column, Integer, String, ForeignKey

from app.config.database import Base


class OrderPreference(Base):

    __tablename__ = "order_preferences"


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


    food_type = Column(
        String(50)
    )


    delivery_note = Column(
        String(255)
    )


    special_instruction = Column(
        String(255)
    )