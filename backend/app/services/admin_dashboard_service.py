from sqlalchemy.orm import Session

from app.models.user import User
from app.models.restaurant import Restaurant
from app.models.delivery_partner import DeliveryPartner
from app.models.order import Order




def get_admin_dashboard_data(

    db: Session

):


    # Total Customers

    total_customers = (

        db.query(User)

        .filter(

            User.role == "CUSTOMER"

        )

        .count()

    )





    # Total Restaurants

    total_restaurants = (

        db.query(Restaurant)

        .count()

    )





    # Total Delivery Partners

    total_delivery_partners = (

        db.query(DeliveryPartner)

        .count()

    )





    # Total Orders

    total_orders = (

        db.query(Order)

        .count()

    )





    # Platform Revenue

    orders = (

        db.query(Order)

        .all()

    )


    platform_revenue = 0



    for order in orders:

        if order.total_amount:

            platform_revenue += order.total_amount





    # Live Orders

    live_orders = (

        db.query(Order)

        .filter(

            Order.order_status.in_(

                [

                    "PLACED",

                    "PREPARING",

                    "OUT_FOR_DELIVERY"

                ]

            )

        )

        .count()

    )





    return {


        "total_customers": total_customers,


        "total_restaurants": total_restaurants,


        "total_delivery_partners": total_delivery_partners,


        "total_orders": total_orders,


        "platform_revenue": platform_revenue,


        "live_orders": live_orders


    }