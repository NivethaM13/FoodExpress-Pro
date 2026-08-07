from pydantic import BaseModel
from datetime import datetime



class RestaurantStaffCreate(BaseModel):

    restaurant_id: int

    staff_name: str

    phone: str | None = None

    email: str | None = None

    role: str = "STAFF"

    shift: str | None = None

    attendance_status: str = "PRESENT"

    performance_score: float = 0





class RestaurantStaffResponse(BaseModel):

    id: int

    restaurant_id: int

    staff_name: str

    phone: str | None

    email: str | None

    role: str

    shift: str | None

    attendance_status: str

    performance_score: float

    created_at: datetime



    class Config:

        from_attributes = True