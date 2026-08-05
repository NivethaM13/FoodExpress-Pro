from pydantic import BaseModel
from datetime import datetime
from typing import Optional



class BranchCreate(BaseModel):

    restaurant_id: int

    manager_id: Optional[int] = None

    branch_name: str

    location: str

    phone: Optional[str] = None





class BranchUpdate(BaseModel):

    manager_id: Optional[int] = None

    branch_name: Optional[str] = None

    location: Optional[str] = None

    phone: Optional[str] = None

    status: Optional[str] = None






class BranchResponse(BaseModel):

    id: int

    restaurant_id: int

    manager_id: Optional[int]

    branch_name: str

    location: str

    phone: Optional[str]

    status: str

    created_at: datetime



    class Config:

        from_attributes = True