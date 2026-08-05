from pydantic import BaseModel
from datetime import datetime
from typing import Optional



class RefundCreate(BaseModel):

    order_id: int

    user_id: int

    refund_amount: float

    cancellation_reason: str



class RefundUpdate(BaseModel):

    refund_status: Optional[str] = None

    payment_status: Optional[str] = None



class RefundResponse(BaseModel):

    id: int

    order_id: int

    user_id: int

    refund_amount: float

    cancellation_reason: str

    refund_status: str

    payment_status: str

    created_at: datetime


    class Config:

        from_attributes = True