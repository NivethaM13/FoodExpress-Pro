from pydantic import BaseModel
from datetime import datetime



class AIDemandPredictionCreate(BaseModel):

    restaurant_id: int

    peak_hour: str | None = None

    demand_level: str = "MEDIUM"

    predicted_orders: int = 0

    popular_food: str | None = None

    inventory_suggestion: str | None = None

    seasonal_trend: str | None = None





class AIDemandPredictionResponse(BaseModel):

    id: int

    restaurant_id: int

    peak_hour: str | None

    demand_level: str

    predicted_orders: int

    popular_food: str | None

    inventory_suggestion: str | None

    seasonal_trend: str | None

    created_at: datetime



    class Config:

        from_attributes = True