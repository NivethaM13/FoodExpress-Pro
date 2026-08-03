from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import get_current_user

from app.models.user import User

from app.services.recommendation_service import (
    get_trending_foods,
    get_personalized_foods,
    get_cuisine_foods,
    get_meal_recommendation
)


router = APIRouter(

    prefix="/recommendations",

    tags=["AI Recommendations"]

)



# 🔥 Trending

@router.get("/trending")
def trending_foods(
    db:Session=Depends(get_db)
):

    return get_trending_foods(db)




# 👤 Personalized

@router.get("/personalized")
def personalized(
    db:Session=Depends(get_db),
    current_user:User=Depends(get_current_user)
):

    return get_personalized_foods(
        db,
        current_user.id
    )





# 🌎 Cuisine

@router.get("/cuisine/{name}")
def cuisine(
    name:str,
    db:Session=Depends(get_db)
):

    return get_cuisine_foods(
        db,
        name
    )





# 🍽️ Meal

@router.get("/meal/{type}")
def meal(
    type:str,
    db:Session=Depends(get_db)
):

    return get_meal_recommendation(
        db,
        type
    )