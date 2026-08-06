from pydantic import BaseModel
from datetime import datetime


class BusinessAnalyticsResponse(BaseModel):

    id: int

    metric_type: str

    metric_name: str

    value: float

    description: str | None

    created_at: datetime


    class Config:
        from_attributes = True