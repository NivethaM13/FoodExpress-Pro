from pydantic import BaseModel
from datetime import datetime
from typing import Optional



class FinancialReportCreate(BaseModel):

    report_type: str

    restaurant_id: Optional[int] = None

    total_revenue: float = 0

    delivery_charges: float = 0

    refund_amount: float = 0

    wallet_amount: float = 0

    transaction_count: int = 0





class FinancialReportResponse(BaseModel):

    id: int

    report_type: str

    restaurant_id: Optional[int]

    total_revenue: float

    delivery_charges: float

    refund_amount: float

    wallet_amount: float

    transaction_count: int

    created_at: datetime



    class Config:

        from_attributes = True