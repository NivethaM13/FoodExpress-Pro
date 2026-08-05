from pydantic import BaseModel
from datetime import datetime
from typing import Optional



class AuditLogCreate(BaseModel):

    user_id: Optional[int] = None

    action: str

    module: str

    description: Optional[str] = None

    ip_address: Optional[str] = None




class AuditLogResponse(BaseModel):

    id: int

    user_id: Optional[int]

    action: str

    module: str

    description: Optional[str]

    ip_address: Optional[str]

    created_at: datetime



    class Config:
        from_attributes = True