from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.config.database import get_db

from app.schemas.business_intelligence import (
    BusinessAnalyticsCreate,
    BusinessAnalyticsResponse
)

from app.services.business_intelligence_service import (
    create_business_analytics,
    get_business_analytics,
    get_analytics_by_type,
    get_kpi_summary
)



router = APIRouter(
    prefix="/business-intelligence",
    tags=["Business Intelligence"]
)





# Create Analytics Report

@router.post(
    "/",
    response_model=BusinessAnalyticsResponse
)
def add_business_analytics(
    data: BusinessAnalyticsCreate,
    db: Session = Depends(get_db)
):

    return create_business_analytics(
        data,
        db
    )







# Get All Analytics

@router.get(
    "/",
    response_model=list[BusinessAnalyticsResponse]
)
def all_business_analytics(
    db: Session = Depends(get_db)
):

    return get_business_analytics(
        db
    )







# Get Analytics By Type

@router.get(
    "/type/{metric_type}",
    response_model=list[BusinessAnalyticsResponse]
)
def analytics_by_type(
    metric_type: str,
    db: Session = Depends(get_db)
):

    return get_analytics_by_type(
        metric_type,
        db
    )







# KPI Dashboard

@router.get(
    "/kpi-summary"
)
def kpi_dashboard(
    db: Session = Depends(get_db)
):

    return get_kpi_summary(
        db
    )