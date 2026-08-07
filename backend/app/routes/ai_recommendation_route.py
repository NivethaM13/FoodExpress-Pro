from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db

from app.schemas.ai_recommendation import (
    AIRecommendationCreate,
    AIRecommendationResponse
)

from app.services.ai_recommendation_service import (
    create_recommendation,
    get_customer_recommendations,
    get_recommendations_by_type
)



router = APIRouter(
    prefix="/ai-recommendations",
    tags=["AI Recommendations"]
)





# Create Recommendation

@router.post(
    "/",
    response_model=AIRecommendationResponse
)
def add_recommendation(
    data: AIRecommendationCreate,
    db: Session = Depends(get_db)
):

    return create_recommendation(
        data,
        db
    )








# Get All Customer Recommendations

@router.get(
    "/customer/{customer_id}",
    response_model=list[AIRecommendationResponse]
)
def customer_recommendations(
    customer_id: int,
    db: Session = Depends(get_db)
):

    return get_customer_recommendations(
        customer_id,
        db
    )








# Get Recommendations By Type

@router.get(
    "/customer/{customer_id}/{recommendation_type}",
    response_model=list[AIRecommendationResponse]
)
def recommendations_by_type(
    customer_id: int,
    recommendation_type: str,
    db: Session = Depends(get_db)
):

    return get_recommendations_by_type(
        customer_id,
        recommendation_type,
        db
    )