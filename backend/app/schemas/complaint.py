from pydantic import BaseModel
from datetime import datetime
from typing import Optional



class ComplaintCreate(BaseModel):

    category: str

    subject: str

    description: str





class ComplaintUpdate(BaseModel):

    status: Optional[str] = None

    resolution_note: Optional[str] = None





class ComplaintResponse(BaseModel):

    id: int

    customer_id: int

    category: str

    subject: str

    description: str

    status: str

    resolution_note: Optional[str]

    created_at: datetime



    class Config:

        from_attributes = True