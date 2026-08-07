from pydantic import BaseModel
from datetime import datetime



class DeliveryTrackingCreate(BaseModel):

    order_id: int

    delivery_partner_id: int

    latitude: float

    longitude: float

    current_location: str

    eta_minutes: int





class DeliveryTrackingResponse(BaseModel):

    id: int

    order_id: int

    delivery_partner_id: int

    latitude: float | None

    longitude: float | None

    current_location: str | None

    eta_minutes: int | None

    delivery_status: str

    completed_at: datetime | None

    created_at: datetime



    class Config:

        from_attributes = True