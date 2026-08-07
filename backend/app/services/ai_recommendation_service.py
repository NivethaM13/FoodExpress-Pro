from sqlalchemy.orm import Session

from app.models.ai_recommendation import AIRecommendation
from app.schemas.ai_recommendation import AIRecommendationCreate



def create_recommendation(
    data: AIRecommendationCreate,
    db: Session
):

    recommendation = AIRecommendation(

        customer_id=data.customer_id,

        food_name=data.food_name,

        category=data.category,

        recommendation_type=data.recommendation_type,

        reason=data.reason,

        price=data.price

    )


    db.add(recommendation)

    db.commit()

    db.refresh(recommendation)


    return recommendation





def get_customer_recommendations(
    customer_id: int,
    db: Session
):

    return db.query(
        AIRecommendation
    ).filter(

        AIRecommendation.customer_id == customer_id,

        AIRecommendation.is_active == True

    ).all()





def get_recommendations_by_type(
    customer_id: int,
    recommendation_type: str,
    db: Session
):

    return db.query(
        AIRecommendation
    ).filter(

        AIRecommendation.customer_id == customer_id,

        AIRecommendation.recommendation_type == recommendation_type,

        AIRecommendation.is_active == True

    ).all()