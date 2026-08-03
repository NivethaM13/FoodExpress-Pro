from typing import Optional
from pydantic import BaseModel



class ReviewCreate(BaseModel):

    restaurant_id: int

    order_id: Optional[int] = None

    restaurant_rating: float

    food_rating: float

    delivery_rating: float

    comment: Optional[str] = None





class ReviewUpdate(BaseModel):

    restaurant_rating: Optional[float] = None

    food_rating: Optional[float] = None

    delivery_rating: Optional[float] = None

    comment: Optional[str] = None

    status: Optional[str] = None





class ReviewResponse(BaseModel):

    id: int

    user_id: int

    restaurant_id: int

    order_id: Optional[int]

    restaurant_rating: float

    food_rating: float

    delivery_rating: float

    comment: Optional[str]

    status: str


    class Config:
        from_attributes = True