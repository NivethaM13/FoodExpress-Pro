from typing import Optional
from datetime import datetime

from pydantic import BaseModel



class CouponCreate(BaseModel):

    code: str

    description: Optional[str] = None


    # REFERRAL / BIRTHDAY / CASHBACK / RESTAURANT / LOYALTY
    coupon_type: str


    # PERCENTAGE / FLAT / CASHBACK
    discount_type: str


    discount_value: float


    min_order_amount: float = 0


    is_free_delivery: bool = False


    restaurant_id: Optional[int] = None


    usage_limit: int = 0


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


    coupon_type: str


    discount_type: str


    discount_value: float


    min_order_amount: float


    is_free_delivery: bool


    restaurant_id: Optional[int]


    usage_limit: int


    used_count: int


    is_active: bool


    expiry_date: Optional[datetime]


    created_at: datetime



    class Config:

        from_attributes = True