from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.models.address import Address
from app.models.favorite import FavoriteRestaurant
from app.models.order_preference import OrderPreference
from app.config.database import Base, engine

from app.routes.delivery_route import router as delivery_router
from app.routes.customer_route import router as customer_router
# Import Models (Required for table creation)
from app.models.user import User
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