from typing import Optional, List
from pydantic import BaseModel



# Place Order Request
class OrderCreate(BaseModel):

    delivery_address: Optional[str] = None



# Order Item Response
class OrderItemResponse(BaseModel):

    id: int

    menu_id: int

    quantity: int

    price: float


    class Config:
        from_attributes = True




# Order Response
class OrderResponse(BaseModel):

    id: int

    user_id: int

    restaurant_id: int

    total_amount: float

    order_status: str

    payment_status: str

    delivery_address: Optional[str] = None

    items: List[OrderItemResponse] = []


    class Config:
        from_attributes = True