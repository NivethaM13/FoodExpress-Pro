from pydantic import BaseModel
from datetime import datetime



class CustomerMembershipCreate(BaseModel):

    customer_id: int

    membership_type: str = "SILVER"

    membership_price: float = 0

    discount_percentage: float = 0

    free_delivery: bool = False

    exclusive_benefits: str | None = None

    expiry_date: datetime | None = None





class CustomerMembershipResponse(BaseModel):

    id: int

    customer_id: int

    membership_type: str

    membership_price: float

    discount_percentage: float

    free_delivery: bool

    exclusive_benefits: str | None

    membership_status: str

    start_date: datetime

    expiry_date: datetime | None

    created_at: datetime



    class Config:

        from_attributes = True