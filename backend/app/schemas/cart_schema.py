from typing import Optional
from pydantic import BaseModel


# Add item to cart
class CartItemCreate(BaseModel):

    menu_id: int

    quantity: int = 1



# Update quantity
class CartItemUpdate(BaseModel):

    quantity: int



# Cart item response
class CartItemResponse(BaseModel):

    id: int

    menu_id: int

    quantity: int

    price: float


    class Config:
        from_attributes = True



# Cart response
class CartResponse(BaseModel):

    id: int

    user_id: int

    items: list[CartItemResponse] = []


    class Config:
        from_attributes = True