from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.config.database import get_db

from app.schemas.financial_dashboard import (
    FinancialReportCreate,
    FinancialReportResponse
)

from app.services.financial_dashboard_service import (
    create_financial_report,
    get_financial_reports,
    get_reports_by_type,
    get_daily_revenue
)



router = APIRouter(
    prefix="/financial-dashboard",
    tags=["Financial Dashboard"]
)





# Create Financial Report

@router.post(
    "/",
    response_model=FinancialReportResponse
)
def add_financial_report(
    data: FinancialReportCreate,
    db: Session = Depends(get_db)
):

    return create_financial_report(
        data,
        db
    )







# Get All Reports

@router.get(
    "/",
    response_model=list[FinancialReportResponse]
)
def all_financial_reports(
    db: Session = Depends(get_db)
):

    return get_financial_reports(
        db
    )







# Get Reports By Type

@router.get(
    "/type/{report_type}",
    response_model=list[FinancialReportResponse]
)
def financial_reports_by_type(
    report_type: str,
    db: Session = Depends(get_db)
):

    return get_reports_by_type(
        report_type,
        db
    )







# Daily Revenue

@router.get(
    "/daily-revenue",
    response_model=list[FinancialReportResponse]
)
def daily_revenue(
    db: Session = Depends(get_db)
):

    return get_daily_revenue(
        db
    )