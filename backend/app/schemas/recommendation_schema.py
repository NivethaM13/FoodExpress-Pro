from pydantic import BaseModel


class RecommendationResponse(BaseModel):

    id:int

    food_id:int

    score:float

    recommendation_type:str


    class Config:

        from_attributes=True