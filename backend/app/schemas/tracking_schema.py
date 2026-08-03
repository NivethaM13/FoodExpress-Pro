from typing import Optional
from pydantic import BaseModel



class TrackingCreate(BaseModel):

    order_id: int

    delivery_partner_id: Optional[int] = None

    latitude: Optional[float] = None

    longitude: Optional[float] = None

    delivery_status: str = "PENDING"

    estimated_time: Optional[str] = None

    route: Optional[str] = None





class TrackingUpdate(BaseModel):

    latitude: Optional[float] = None

    longitude: Optional[float] = None

    delivery_status: Optional[str] = None

    estimated_time: Optional[str] = None

    route: Optional[str] = None