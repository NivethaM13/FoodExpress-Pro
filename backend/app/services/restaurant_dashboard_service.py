from sqlalchemy.orm import Session

from app.models.order import Order
from app.models.review import Review
from app.models.menu import Menu



def get_dashboard_data(
    db: Session,
    restaurant_id: int
):


    # Today's Orders

    today_orders = (

        db.query(Order)

        .filter(
            Order.restaurant_id == restaurant_id
        )

        .count()

    )




    # Revenue Summary

    orders = (

        db.query(Order)

        .filter(
            Order.restaurant_id == restaurant_id
        )

        .all()

    )


    revenue = 0


    for order in orders:

        if order.total_amount:

            revenue += order.total_amount





    # Popular Food Items

    popular_foods = (

        db.query(Menu)

        .limit(5)

        .all()

    )






    # Customer Reviews

    reviews = (

        db.query(Review)

        .filter(
            Review.restaurant_id == restaurant_id
        )

        .all()

    )





    # Average Restaurant Rating

    rating = 0


    if reviews:

        rating = sum(

            review.restaurant_rating

            for review in reviews

        ) / len(reviews)






    return {


        "today_orders": today_orders,


        "total_revenue": revenue,


        "popular_foods": popular_foods,


        "total_reviews": len(reviews),


        "average_rating": round(rating, 2)

    }