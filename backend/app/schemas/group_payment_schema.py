from pydantic import BaseModel
from datetime import datetime



class GroupPaymentCreate(BaseModel):

    group_order_id: int

    payment_method: str





class GroupPaymentResponse(BaseModel):

    id: int

    group_order_id: int

    user_id: int

    amount: float

    payment_status: str

    payment_method: str | None

    created_at: datetime


    class Config:

        from_attributes = True