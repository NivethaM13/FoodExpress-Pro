from pydantic import BaseModel
from datetime import datetime



class RestaurantPerformanceCreate(BaseModel):

    restaurant_id: int

    daily_sales: float = 0

    weekly_revenue: float = 0

    monthly_revenue: float = 0

    popular_dish: str | None = None

    customer_growth: int = 0





class RestaurantPerformanceResponse(BaseModel):

    id: int

    restaurant_id: int

    daily_sales: float

    weekly_revenue: float

    monthly_revenue: float

    popular_dish: str | None

    customer_growth: int

    created_at: datetime



    class Config:

        from_attributes = True