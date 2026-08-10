from sqlalchemy.orm import Session

from app.models.financial_dashboard import FinancialReport

from app.schemas.financial_dashboard import (
    FinancialReportCreate
)



# Create Financial Report

def create_financial_report(
    data: FinancialReportCreate,
    db: Session
):

    report = FinancialReport(

        report_type=data.report_type,

        restaurant_id=data.restaurant_id,

        total_revenue=data.total_revenue,

        delivery_charges=data.delivery_charges,

        refund_amount=data.refund_amount,

        wallet_amount=data.wallet_amount,

        transaction_count=data.transaction_count

    )


    db.add(report)

    db.commit()

    db.refresh(report)


    return report






# Get All Financial Reports

def get_financial_reports(
    db: Session
):

    return db.query(
        FinancialReport
    ).all()







# Get Reports By Type

def get_reports_by_type(
    report_type: str,
    db: Session
):

    return db.query(
        FinancialReport
    ).filter(
        FinancialReport.report_type == report_type
    ).all()






# Daily Revenue Summary

def get_daily_revenue(
    db: Session
):

    return db.query(
        FinancialReport
    ).filter(
        FinancialReport.report_type == "DAILY_REVENUE"
    ).all()