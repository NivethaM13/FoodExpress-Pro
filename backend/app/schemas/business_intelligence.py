from pydantic import BaseModel
from datetime import datetime




class BusinessAnalyticsCreate(BaseModel):

    metric_type: str

    total_customers: int = 0

    customer_retention_rate: float = 0

    total_restaurants: int = 0

    restaurant_growth_rate: float = 0

    total_deliveries: int = 0

    delivery_success_rate: float = 0

    average_delivery_time: float = 0

    total_revenue: float = 0

    revenue_forecast: float = 0






class BusinessAnalyticsResponse(BaseModel):

    id: int

    metric_type: str

    total_customers: int

    customer_retention_rate: float

    total_restaurants: int

    restaurant_growth_rate: float

    total_deliveries: int

    delivery_success_rate: float

    average_delivery_time: float

    total_revenue: float

    revenue_forecast: float

    created_at: datetime



    class Config:

        from_attributes = True