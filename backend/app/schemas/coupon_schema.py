from typing import Optional
from datetime import datetime

from pydantic import BaseModel



class CouponCreate(BaseModel):

    code: str

    description: Optional[str] = None

    discount_type: str

    discount_value: float

    min_order_amount: float = 0

    is_free_delivery: bool = False

    expiry_date: Optional[datetime] = None




class CouponUpdate(BaseModel):

    description: Optional[str] = None

    discount_value: Optional[float] = None

    is_active: Optional[bool] = None

    expiry_date: Optional[datetime] = None




class CouponResponse(BaseModel):

    id: int

    code: str

    description: Optional[str]

    discount_type: str

    discount_value: float

    min_order_amount: float

    is_free_delivery: bool

    is_active: bool


    class Config:
        from_attributes = True