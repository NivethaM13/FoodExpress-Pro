from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import admin_required

from app.models.user import User

from app.services.business_analytics_service import (
    get_revenue_analytics,
    get_customer_growth,
    get_order_trends,
    get_restaurant_performance,
    get_activity_count,
    get_peak_ordering_hours,
    get_top_selling_foods,
    get_delivery_performance,
    get_customer_retention
)


router = APIRouter(
    prefix="/business-dashboard",
    tags=["Business Intelligence"]
)



@router.get("/")
def dashboard(

    db: Session = Depends(get_db),

    current_admin: User = Depends(admin_required)

):

    return {

        "revenue":
        get_revenue_analytics(db),


        "customers":
        get_customer_growth(db),


        "orders":
        get_order_trends(db),


        "restaurants":
        get_restaurant_performance(db),


        "activities":
        get_activity_count(db),


        "peak_hours":
        get_peak_ordering_hours(db),


        "top_foods":
        get_top_selling_foods(db),


        "delivery":
        get_delivery_performance(db),


        "retention":
        get_customer_retention(db)

    }