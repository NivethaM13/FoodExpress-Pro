from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import restaurant_owner_required

from app.models.user import User

from app.schemas.restaurant_finance_schema import (
    RestaurantFinanceCreate
)

from app.services.restaurant_finance_service import (
    create_financial_report,
    get_financial_report,
    get_all_financial_reports
)



router = APIRouter(

    prefix="/restaurant-finance",

    tags=["Restaurant Financial Management"]

)





# Create Financial Report

@router.post("/")
def create_report(

    data: RestaurantFinanceCreate,

    db: Session = Depends(get_db),

    current_user: User = Depends(restaurant_owner_required)

):

    return create_financial_report(

        data,

        db

    )







# Get Restaurant Financial Report

@router.get("/{restaurant_id}")
def restaurant_finance(

    restaurant_id:int,

    db:Session = Depends(get_db),

    current_user:User = Depends(restaurant_owner_required)

):

    return get_financial_report(

        restaurant_id,

        db

    )







# Get All Financial Reports

@router.get("/")
def all_finance_reports(

    db:Session = Depends(get_db),

    current_user:User = Depends(restaurant_owner_required)

):

    return get_all_financial_reports(

        db

    )