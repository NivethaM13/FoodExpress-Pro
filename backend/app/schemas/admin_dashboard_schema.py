from pydantic import BaseModel


class AdminDashboardResponse(BaseModel):

    total_customers: int

    total_restaurants: int

    total_delivery_partners: int

    total_orders: int

    platform_revenue: float

    live_orders: int