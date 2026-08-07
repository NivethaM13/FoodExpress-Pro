from pydantic import BaseModel
from datetime import date, datetime



class SmartInventoryCreate(BaseModel):

    restaurant_id: int

    ingredient_name: str

    current_stock: float = 0

    minimum_stock: float = 0

    unit: str | None = None

    purchase_suggestion: str | None = None

    expiry_date: date | None = None





class SmartInventoryResponse(BaseModel):

    id: int

    restaurant_id: int

    ingredient_name: str

    current_stock: float

    minimum_stock: float

    unit: str | None

    low_stock_status: str

    purchase_suggestion: str | None

    expiry_date: date | None

    expiry_status: str

    created_at: datetime



    class Config:

        from_attributes = True