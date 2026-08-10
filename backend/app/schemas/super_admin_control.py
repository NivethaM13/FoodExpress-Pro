from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class SuperAdminControlBase(BaseModel):

    admin_name: str

    control_type: str

    description: Optional[str] = None

    manage_restaurants: bool = False

    manage_customers: bool = False

    manage_delivery_partners: bool = False

    platform_settings: bool = False

    system_monitoring: bool = False

    user_verification: bool = False

    status: Optional[str] = "ACTIVE"



class SuperAdminControlCreate(
    SuperAdminControlBase
):
    pass



class SuperAdminControlResponse(
    SuperAdminControlBase
):

    id: int

    created_at: datetime


    class Config:
        from_attributes = True