from sqlalchemy.orm import Session

from app.models.report import Report
from app.models.order import Order
from app.models.restaurant import Restaurant
from app.models.user import User



# Create Report

def create_report(
    db: Session,
    data
):

    report = Report(

        report_type=data.report_type,

        title=data.title,

        total_amount=data.total_amount,

        total_count=data.total_count,

        generated_by=data.generated_by

    )


    db.add(report)

    db.commit()

    db.refresh(report)


    return report






# Sales Report

def get_sales_report(
    db: Session
):

    orders = (
        db.query(Order)
        .all()
    )


    total_sales = sum(

        order.total_amount

        for order in orders

    )


    return {

        "report_type":"SALES",

        "total_orders":len(orders),

        "total_sales":total_sales

    }







# Restaurant Report

def get_restaurant_report(
    db: Session
):

    restaurants = (

        db.query(Restaurant)

        .all()

    )


    return {

        "report_type":"RESTAURANT",

        "total_restaurants":len(restaurants)

    }








# Delivery Report

def get_delivery_report(
    db: Session
):

    orders = (

        db.query(Order)

        .filter(

            Order.delivery_partner_id != None

        )

        .all()

    )


    completed = len(

        [

            order for order in orders

            if order.order_status == "DELIVERED"

        ]

    )


    return {

        "report_type":"DELIVERY",

        "assigned_deliveries":len(orders),

        "completed_deliveries":completed

    }







# Customer Report

def get_customer_report(
    db: Session
):

    customers = (

        db.query(User)

        .filter(

            User.role == "CUSTOMER"

        )

        .count()

    )


    return {

        "report_type":"CUSTOMER",

        "total_customers":customers

    }