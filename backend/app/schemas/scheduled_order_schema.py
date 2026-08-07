from pydantic import BaseModel
from datetime import date, time, datetime



class ScheduledOrderCreate(BaseModel):

    restaurant_id: int

    scheduled_date: date

    scheduled_time: time

    recurring_type: str = "NONE"

    reminder_time: int = 30





class ScheduledOrderResponse(BaseModel):

    id: int

    user_id: int

    restaurant_id: int

    order_id: int | None = None

    scheduled_date: date

    scheduled_time: time

    recurring_type: str

    status: str

    reminder_sent: bool

    reminder_time: int

    next_delivery_date: date | None = None

    created_at: datetime


    class Config:

        from_attributes = True