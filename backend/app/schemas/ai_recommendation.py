from pydantic import BaseModel
from datetime import datetime
from typing import Optional



class AIRecommendationBase(BaseModel):

    food_name: str

    category: Optional[str] = None

    recommendation_type: str

    reason: Optional[str] = None

    price: Optional[float] = None




class AIRecommendationCreate(
    AIRecommendationBase
):
    customer_id: int





class AIRecommendationResponse(
    AIRecommendationBase
):

    id: int

    customer_id: int

    is_active: bool

    created_at: datetime



    class Config:
        from_attributes = True