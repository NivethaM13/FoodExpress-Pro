from typing import Optional
from pydantic import BaseModel



# Create Payment

class PaymentCreate(BaseModel):

    order_id: int

    payment_method: str

    amount: float



# Update Payment Status

class PaymentUpdate(BaseModel):

    payment_status: str

    transaction_id: Optional[str] = None



# Payment Response

class PaymentResponse(BaseModel):

    id: int

    order_id: int

    user_id: int

    payment_method: str

    payment_status: str

    transaction_id: Optional[str]

    amount: float


    class Config:
        from_attributes = True