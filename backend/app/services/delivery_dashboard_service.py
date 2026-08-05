from sqlalchemy.orm import Session

from app.models.order import Order
from app.models.review import Review



def get_delivery_dashboard_data(

    db: Session,

    delivery_partner_id: int

):


    # Assigned Deliveries

    assigned = (

        db.query(Order)

        .filter(

            Order.delivery_partner_id == delivery_partner_id

        )

        .count()

    )





    # Completed Deliveries

    completed = (

        db.query(Order)

        .filter(

            Order.delivery_partner_id == delivery_partner_id,

            Order.order_status == "DELIVERED"

        )

        .count()

    )





    # Earnings

    orders = (

        db.query(Order)

        .filter(

            Order.delivery_partner_id == delivery_partner_id

        )

        .all()

    )



    earnings = 0



    for order in orders:


        if order.order_status == "DELIVERED":

            earnings += 50





    # Delivery Performance

    reviews = (

        db.query(Review)

        .filter(

            Review.user_id == delivery_partner_id

        )

        .all()

    )



    rating = 0



    if reviews:


        rating = sum(

            review.delivery_rating

            for review in reviews

        ) / len(reviews)





    # Route Optimization

    routes = [

        "Restaurant → Customer Route 1",

        "Restaurant → Customer Route 2"

    ]





    return {


        "assigned_deliveries": assigned,


        "completed_deliveries": completed,


        "total_earnings": earnings,


        "delivery_rating": round(rating, 2),


        "route_suggestions": routes


    }