from pydantic import BaseModel


class CustomerDashboardResponse(BaseModel):

    recent_orders: list

    favorite_restaurants: list

    saved_addresses: list

    wallet_balance: float

    notifications: list