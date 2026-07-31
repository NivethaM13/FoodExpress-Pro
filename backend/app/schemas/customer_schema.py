from typing import Optional
from pydantic import BaseModel


# Profile Update

class ProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    mobile: Optional[str] = None
    profile_image: Optional[str] = None



# Address

class AddressCreate(BaseModel):
    title: str
    address_line: str
    city: str
    state: str
    pincode: str
    latitude: Optional[str] = None
    longitude: Optional[str] = None
    is_default: bool = False



class AddressUpdate(BaseModel):
    title: Optional[str] = None
    address_line: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None
    latitude: Optional[str] = None
    longitude: Optional[str] = None
    is_default: Optional[bool] = None



# Preferences

class PreferenceCreate(BaseModel):
    food_type: Optional[str] = None
    delivery_note: Optional[str] = None
    special_instruction: Optional[str] = None