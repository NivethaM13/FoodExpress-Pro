from pydantic import BaseModel
from datetime import datetime



class GroupCartCreate(BaseModel):

    group_order_id: int

    menu_id: int

    quantity: int = 1





class GroupCartResponse(BaseModel):

    id: int

    group_order_id: int

    user_id: int

    menu_id: int

    quantity: int

    price: float

    created_at: datetime


    class Config:

        from_attributes = True