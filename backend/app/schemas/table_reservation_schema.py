from pydantic import BaseModel
from datetime import date, time, datetime



class TableReservationCreate(BaseModel):

    restaurant_id: int

    reservation_date: date

    reservation_time: time

    seats: int





class TableReservationResponse(BaseModel):

    id: int

    user_id: int

    restaurant_id: int

    reservation_date: date

    reservation_time: time

    seats: int

    status: str

    created_at: datetime



    class Config:

        from_attributes = True