from pydantic import BaseModel
from typing import Optional
from datetime import datetime



class InventoryCreate(BaseModel):

    restaurant_id: int

    ingredient_name: str

    quantity: float

    unit: str

    minimum_stock: float

    supplier_name: Optional[str] = None

    supplier_contact: Optional[str] = None

    price: float



class InventoryUpdate(BaseModel):

    ingredient_name: Optional[str] = None

    quantity: Optional[float] = None

    unit: Optional[str] = None

    minimum_stock: Optional[float] = None

    supplier_name: Optional[str] = None

    supplier_contact: Optional[str] = None

    price: Optional[float] = None



class InventoryResponse(BaseModel):

    id: int

    restaurant_id: int

    ingredient_name: str

    quantity: float

    unit: str

    minimum_stock: float

    supplier_name: Optional[str]

    supplier_contact: Optional[str]

    price: float

    created_at: datetime


    class Config:
        from_attributes = True