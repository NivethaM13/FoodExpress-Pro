from typing import Optional
from pydantic import BaseModel



# Registration
class DeliveryPartnerCreate(BaseModel):

    full_name: str

    phone: str

    profile_image: Optional[str] = None

    vehicle_type: Optional[str] = None

    vehicle_number: Optional[str] = None

    driving_license: Optional[str] = None



# Update Profile
class DeliveryPartnerUpdate(BaseModel):

    full_name: Optional[str] = None

    phone: Optional[str] = None

    profile_image: Optional[str] = None

    vehicle_type: Optional[str] = None

    vehicle_number: Optional[str] = None

    driving_license: Optional[str] = None

    is_available: Optional[bool] = None



# Response
class DeliveryPartnerResponse(BaseModel):

    id: int

    user_id: int

    full_name: str

    phone: str

    profile_image: Optional[str]

    verification_status: str

    vehicle_type: Optional[str]

    vehicle_number: Optional[str]

    driving_license: Optional[str]

    is_available: bool


    class Config:
        from_attributes = True