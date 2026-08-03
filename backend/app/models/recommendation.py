from sqlalchemy import Column, Integer, String, Float
from app.config.database import Base


class Recommendation(Base):

    __tablename__ = "recommendations"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    user_id = Column(
        Integer
    )


    food_id = Column(
        Integer
    )


    score = Column(
        Float,
        default=0
    )


    recommendation_type = Column(
        String(50)
    )