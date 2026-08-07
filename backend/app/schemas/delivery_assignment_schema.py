from pydantic import BaseModel
from datetime import datetime



class DeliveryAssignmentCreate(BaseModel):

    order_id: int





class DeliveryAssignmentResponse(BaseModel):

    id: int

    order_id: int

    delivery_partner_id: int

    distance_km: float | None

    delivery_load: int

    assignment_status: str

    assigned_at: datetime



    class Config:

        from_attributes = True