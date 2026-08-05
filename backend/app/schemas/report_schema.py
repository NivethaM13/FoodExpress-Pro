from pydantic import BaseModel
from datetime import datetime
from typing import Optional



class ReportCreate(BaseModel):

    report_type: str

    title: str

    total_amount: float = 0

    total_count: int = 0

    generated_by: Optional[int] = None





class ReportResponse(BaseModel):

    id: int

    report_type: str

    title: str

    total_amount: float

    total_count: int

    generated_by: Optional[int]

    created_at: datetime



    class Config:
        from_attributes = True