from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import restaurant_owner_required

from app.models.user import User

from app.schemas.ai_demand_prediction_schema import (
    AIDemandPredictionCreate
)

from app.services.ai_demand_prediction_service import (
    create_prediction,
    get_restaurant_prediction,
    get_all_predictions
)


router = APIRouter(

    prefix="/ai-demand-prediction",

    tags=["AI Demand Prediction"]

)





# Create AI Prediction

@router.post("/")
def create_ai_prediction(

    data: AIDemandPredictionCreate,

    db: Session = Depends(get_db),

    current_user: User = Depends(restaurant_owner_required)

):

    return create_prediction(

        data,

        db

    )







# Get Restaurant Prediction

@router.get("/{restaurant_id}")
def restaurant_prediction(

    restaurant_id: int,

    db: Session = Depends(get_db),

    current_user: User = Depends(restaurant_owner_required)

):

    return get_restaurant_prediction(

        restaurant_id,

        db

    )







# Get All Predictions

@router.get("/")
def all_predictions(

    db: Session = Depends(get_db),

    current_user: User = Depends(restaurant_owner_required)

):

    return get_all_predictions(

        db

    )