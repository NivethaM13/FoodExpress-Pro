from sqlalchemy.orm import Session

from app.models.business_intelligence import BusinessAnalytics

from app.schemas.business_intelligence import (
    BusinessAnalyticsCreate
)





# Create Business Analytics Report

def create_business_analytics(
    data: BusinessAnalyticsCreate,
    db: Session
):

    analytics = BusinessAnalytics(

        metric_type=data.metric_type,

        total_customers=data.total_customers,

        customer_retention_rate=data.customer_retention_rate,

        total_restaurants=data.total_restaurants,

        restaurant_growth_rate=data.restaurant_growth_rate,

        total_deliveries=data.total_deliveries,

        delivery_success_rate=data.delivery_success_rate,

        average_delivery_time=data.average_delivery_time,

        total_revenue=data.total_revenue,

        revenue_forecast=data.revenue_forecast

    )


    db.add(analytics)

    db.commit()

    db.refresh(analytics)


    return analytics







# Get All Analytics

def get_business_analytics(
    db: Session
):

    return db.query(
        BusinessAnalytics
    ).all()







# Get Analytics By Metric Type

def get_analytics_by_type(
    metric_type: str,
    db: Session
):

    return db.query(
        BusinessAnalytics
    ).filter(
        BusinessAnalytics.metric_type == metric_type
    ).all()







# KPI Dashboard Summary

def get_kpi_summary(
    db: Session
):

    reports = db.query(
        BusinessAnalytics
    ).all()



    return {

        "total_customers":
        sum(
            r.total_customers
            for r in reports
        ),


        "total_restaurants":
        sum(
            r.total_restaurants
            for r in reports
        ),


        "total_deliveries":
        sum(
            r.total_deliveries
            for r in reports
        ),


        "total_revenue":
        sum(
            r.total_revenue
            for r in reports
        ),


        "revenue_forecast":
        sum(
            r.revenue_forecast
            for r in reports
        )

    }