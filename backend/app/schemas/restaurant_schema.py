from typing import Optional
from pydantic import BaseModel, EmailStr


class RestaurantBase(BaseModel):

    name: str

    description: Optional[str] = None

    cuisine: str

    address: str

    city: str

    state: str

    pincode: str

    phone: str

    email: Optional[EmailStr] = None

    image: Optional[str] = None

    opening_time: Optional[str] = None

    closing_time: Optional[str] = None

    # Module 4: Delivery Radius
    delivery_radius: int = 5



class RestaurantCreate(RestaurantBase):
    pass



class RestaurantUpdate(BaseModel):

    name: Optional[str] = None

    description: Optional[str] = None

    cuisine: Optional[str] = None

    address: Optional[str] = None

    city: Optional[str] = None

    state: Optional[str] = None

    pincode: Optional[str] = None

    phone: Optional[str] = None

    email: Optional[EmailStr] = None

    image: Optional[str] = None

    opening_time: Optional[str] = None

    closing_time: Optional[str] = None

    delivery_radius: Optional[int] = None

    is_active: Optional[bool] = None



class RestaurantResponse(RestaurantBase):

    id: int

    owner_id: int

    is_active: bool


    class Config:
        from_attributes = True