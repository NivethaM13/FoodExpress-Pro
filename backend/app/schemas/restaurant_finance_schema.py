from pydantic import BaseModel
from datetime import datetime



class RestaurantFinanceCreate(BaseModel):

    restaurant_id: int

    total_revenue: float = 0

    total_expense: float = 0

    tax_amount: float = 0

    report_period: str | None = None





class RestaurantFinanceResponse(BaseModel):

    id: int

    restaurant_id: int

    total_revenue: float

    total_expense: float

    profit_amount: float

    tax_amount: float

    financial_status: str

    report_period: str | None

    created_at: datetime



    class Config:

        from_attributes = True