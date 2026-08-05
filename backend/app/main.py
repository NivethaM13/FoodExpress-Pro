from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models.address import Address
from app.models.favorite import FavoriteRestaurant
from app.models.order_preference import OrderPreference
from app.config.database import Base, engine
from app.models.order_tracking import OrderTracking
from app.routes.payment_route import router as payment_router
from app.models.coupon import Coupon
from app.models.chat import Chat
from app.routes.upload_route import router as upload_router
from app.routes.recommendation_route import router as recommendation_router
from fastapi.staticfiles import StaticFiles
from app.routes.chat_route import router as chat_router
from app.routes.review_route import router as review_router
from app.routes.chatbot_route import router as chatbot_router
from app.models.review import Review
from app.routes.coupon_route import router as coupon_router
from app.models.wallet import Wallet
from app.models.wallet_transaction import WalletTransaction
from app.models.notification import Notification
from app.routes.restaurant_dashboard_route import router as restaurant_dashboard_router
from app.routes.notification_route import router as notification_router
from app.routes.wallet_route import router as wallet_router
from app.models.payment import Payment
from app.routes.tracking_route import router as tracking_router
from app.routes.delivery_route import router as delivery_router
from app.routes.customer_route import router as customer_router
# Import Models (Required for table creation)
from app.models.user import User
from app.routes.report_route import router as report_router



from app.routes.branch_route import router as branch_router
from app.routes.refund_route import router as refund_router
from app.routes.inventory_route import router as inventory_router
from app.routes.admin_dashboard_route import router as admin_dashboard_router
from app.routes.delivery_dashboard_route import router as delivery_dashboard_router
from app.routes.cart_route import router as cart_router
from app.models.cart import Cart
from app.models.cart_item import CartItem
from app.models.menu import Menu
from app.models.restaurant_verification import RestaurantVerification
from app.models.order import Order
from app.models.order_item import OrderItem
from app.routes.kitchen_route import router as kitchen_router
from app.routes.delivery_partner_route import router as delivery_partner_router
from app.models.delivery_partner import DeliveryPartner
from app.routes.order_route import router as order_router
from app.routes.restaurant_verification_route import router as verification_router
from app.models.restaurant import Restaurant
from app.models.menu import Menu
from app.models.menu_addon import MenuAddon
from app.routes.customer_dashboard_route import router as customer_dashboard_router
from app.routes.menu_addon_route import router as addon_router
# Import Routes
from app.routes.auth_route import router as auth_router
from app.routes.admin_route import router as admin_router
from app.routes.restaurant_route import router as restaurant_router
from app.routes.menu_route import router as menu_router

app = FastAPI(
    title="Online Food Delivery & Restaurant Management Platform"
)

# Create Database Tables
Base.metadata.create_all(bind=engine)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routes
app.include_router(auth_router)
app.include_router(cart_router)
app.include_router(addon_router)
app.include_router(verification_router)
app.include_router(customer_router)
app.include_router(admin_router)
app.include_router(payment_router)
app.include_router(coupon_router)
app.include_router(
    delivery_dashboard_router
)
app.include_router(refund_router)

app.include_router(branch_router)
app.include_router(
    customer_dashboard_router
)

app.include_router(
    admin_dashboard_router
)

app.include_router(
    chatbot_router
)

app.include_router(
    restaurant_dashboard_router
)

app.include_router(
    recommendation_router
)
app.include_router(review_router)
app.include_router(chat_router)
app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)

app.include_router(
    inventory_router
)


app.include_router(report_router)
app.include_router(upload_router)
app.include_router(notification_router)
app.include_router(wallet_router)
app.include_router(tracking_router)
app.include_router(kitchen_router)
app.include_router(delivery_router)
app.include_router(delivery_partner_router)
app.include_router(order_router)
app.include_router(restaurant_router)
app.include_router(menu_router)


@app.get("/")
def home():
    return {
        "message": "Online Food Delivery & Restaurant Management Platform API is Running"
    }