from sqlalchemy.orm import Session

from app.models.order import Order
from app.models.notification import Notification



def get_customer_dashboard_data(

    db: Session,

    user_id: int

):


    # Recent Orders

    recent_orders = (

        db.query(Order)

        .filter(

            Order.user_id == user_id

        )

        .order_by(

            Order.created_at.desc()

        )

        .limit(5)

        .all()

    )





    # Favorite Restaurants

    favorite_restaurants = [

        "Pizza Palace",

        "Burger House",

        "Spice Garden"

    ]





    # Saved Addresses

    saved_addresses = []






    # Wallet Balance

    wallet_balance = 0





    # Notifications

    notifications = (

        db.query(Notification)

        .filter(

            Notification.user_id == user_id

        )

        .order_by(

            Notification.created_at.desc()

        )

        .limit(5)

        .all()

    )





    return {


        "recent_orders": recent_orders,


        "favorite_restaurants": favorite_restaurants,


        "saved_addresses": saved_addresses,


        "wallet_balance": wallet_balance,


        "notifications": notifications


    }