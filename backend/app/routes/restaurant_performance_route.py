from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import restaurant_owner_required

from app.models.user import User

from app.schemas.restaurant_performance_schema import (
    RestaurantPerformanceCreate
)

from app.services.restaurant_performance_service import (
    create_performance,
    get_restaurant_performance,
    get_all_performance
)



router = APIRouter(

    prefix="/restaurant-performance",

    tags=["Restaurant Performance"]

)





# Create Performance Data

@router.post("/")
def create_dashboard_data(

    data: RestaurantPerformanceCreate,

    db: Session = Depends(get_db),

    current_user: User = Depends(restaurant_owner_required)

):

    return create_performance(

        data,

        db

    )







# Get Restaurant Performance

@router.get("/{restaurant_id}")
def restaurant_dashboard(

    restaurant_id: int,

    db: Session = Depends(get_db),

    current_user: User = Depends(restaurant_owner_required)

):

    return get_restaurant_performance(

        restaurant_id,

        db

    )







# Get All Performance

@router.get("/")
def all_restaurant_performance(

    db: Session = Depends(get_db),

    current_user: User = Depends(restaurant_owner_required)

):

    return get_all_performance(

        db

    )