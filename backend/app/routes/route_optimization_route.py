from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import admin_required

from app.models.user import User

from app.schemas.route_optimization_schema import (
    RouteOptimizationCreate
)

from app.services.route_optimization_service import (
    calculate_route,
    get_route_history
)



router = APIRouter(

    prefix="/route-optimization",

    tags=["Route Optimization"]

)





# Calculate Optimized Route

@router.post("/")
def optimize_route(

    data: RouteOptimizationCreate,

    db: Session = Depends(get_db),

    current_user: User = Depends(admin_required)

):


    return calculate_route(

        data,

        db

    )







# Route History

@router.get("/history")
def route_history(

    db: Session = Depends(get_db),

    current_user: User = Depends(admin_required)

):


    return get_route_history(

        db

    )