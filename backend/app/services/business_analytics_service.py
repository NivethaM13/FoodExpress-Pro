from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.order import Order
from app.models.user import User
from app.models.restaurant import Restaurant
from app.models.audit_log import AuditLog
from app.models.order_item import OrderItem
from app.models.menu import Menu
from app.models.order_tracking import OrderTracking


# Revenue Analytics



def get_peak_ordering_hours(db: Session):

    hours = (
        db.query(
            func.hour(Order.created_at).label("hour"),
            func.count(Order.id).label("total")
        )
        .group_by(
            func.hour(Order.created_at)
        )
        .order_by(
            func.count(Order.id).desc()
        )
        .all()
    )


    return [
        {
            "hour": item.hour,
            "orders": item.total
        }
        for item in hours
    ]




def get_customer_retention(db: Session):

    repeat_customers = (
        db.query(
            Order.user_id
        )
        .group_by(
            Order.user_id
        )
        .having(
            func.count(Order.id) > 1
        )
        .count()
    )


    return {

        "repeat_customers": repeat_customers

    }





    

def get_top_selling_foods(db: Session):

    foods = (
        db.query(
            Menu.name,
            func.sum(OrderItem.quantity).label("sold")
        )
        .join(
            OrderItem,
            Menu.id == OrderItem.menu_id
        )
        .group_by(
            Menu.name
        )
        .order_by(
            func.sum(OrderItem.quantity).desc()
        )
        .limit(10)
        .all()
    )


    return [
        {
            "food": item.name,
            "quantity": item.sold
        }
        for item in foods
    ]



def get_delivery_performance(db: Session):

    delivered = (
        db.query(Order)
        .filter(
            Order.order_status == "DELIVERED"
        )
        .count()
    )


    total = (
        db.query(Order)
        .count()
    )


    return {

        "total_orders": total,

        "delivered_orders": delivered

    }



def get_revenue_analytics(db: Session):

    revenue = (
        db.query(
            func.sum(Order.total_amount)
        )
        .scalar()
    )


    return {
        "metric": "TOTAL_REVENUE",
        "value": revenue or 0
    }




# Customer Growth

def get_customer_growth(db: Session):

    customers = (
        db.query(User)
        .filter(
            User.role == "CUSTOMER"
        )
        .count()
    )


    return {
        "metric": "TOTAL_CUSTOMERS",
        "value": customers
    }




# Order Trends

def get_order_trends(db: Session):

    orders = (
        db.query(Order)
        .count()
    )


    return {
        "metric": "TOTAL_ORDERS",
        "value": orders
    }




# Restaurant Performance

def get_restaurant_performance(db: Session):

    restaurants = (
        db.query(Restaurant)
        .count()
    )


    return {
        "metric": "TOTAL_RESTAURANTS",
        "value": restaurants
    }





# Security Activity

def get_activity_count(db: Session):

    activities = (
        db.query(AuditLog)
        .count()
    )


    return {
        "metric": "TOTAL_ACTIVITY",
        "value": activities
    }