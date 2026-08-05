from pydantic import BaseModel


class RestaurantDashboardResponse(BaseModel):

    today_orders:int

    total_revenue:float

    popular_foods:list

    total_reviews:int

    average_rating:float