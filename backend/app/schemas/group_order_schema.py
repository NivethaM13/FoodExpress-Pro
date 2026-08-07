from pydantic import BaseModel
from datetime import datetime



class GroupOrderCreate(BaseModel):

    restaurant_id: int

    title: str





class GroupOrderResponse(BaseModel):

    id: int

    creator_id: int

    restaurant_id: int

    title: str

    invite_code: str

    status: str

    payment_status: str

    created_at: datetime


    class Config:

        from_attributes = True





class JoinGroupOrder(BaseModel):

    invite_code: str