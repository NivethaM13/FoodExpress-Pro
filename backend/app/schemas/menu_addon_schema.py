from typing import Optional
from pydantic import BaseModel


class MenuAddonCreate(BaseModel):

    menu_id: int

    addon_name: str

    addon_price: float

    is_available: bool = True



class MenuAddonUpdate(BaseModel):

    addon_name: Optional[str] = None

    addon_price: Optional[float] = None

    is_available: Optional[bool] = None