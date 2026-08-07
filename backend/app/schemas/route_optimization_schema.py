from pydantic import BaseModel
from datetime import datetime



class RouteOptimizationCreate(BaseModel):

    delivery_assignment_id: int

    start_location: str

    end_location: str





class RouteOptimizationResponse(BaseModel):

    id: int

    delivery_assignment_id: int

    start_location: str

    end_location: str

    total_distance_km: float | None

    estimated_time: int | None

    traffic_status: str

    route_status: str

    created_at: datetime



    class Config:

        from_attributes = True