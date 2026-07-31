from typing import Optional
from pydantic import BaseModel


class MenuBase(BaseModel):

    name: str

    description: Optional[str] = None

    category: str

    # Module 6: Veg / Non-Veg
    food_type: str = "VEG"

    price: float

    image: Optional[str] = None

    is_available: bool = True



class MenuCreate(MenuBase):
    pass



class MenuUpdate(BaseModel):

    name: Optional[str] = None

    description: Optional[str] = None

    category: Optional[str] = None

    food_type: Optional[str] = None

    price: Optional[float] = None

    image: Optional[str] = None

    is_available: Optional[bool] = None



class MenuResponse(MenuBase):

    id: int

    restaurant_id: int


    class Config:
        from_attributes = True