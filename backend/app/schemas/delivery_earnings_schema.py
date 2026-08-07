from pydantic import BaseModel
from datetime import datetime



class DeliveryEarningsCreate(BaseModel):

    delivery_partner_id: int

    daily_earnings: float = 0

    weekly_earnings: float = 0

    incentive_amount: float = 0

    bonus_amount: float = 0

    payment_status: str = "PENDING"





class DeliveryEarningsResponse(BaseModel):

    id: int

    delivery_partner_id: int

    daily_earnings: float

    weekly_earnings: float

    incentive_amount: float

    bonus_amount: float

    total_payment: float

    payment_status: str

    payment_date: datetime | None

    created_at: datetime



    class Config:

        from_attributes = True