from pydantic import BaseModel
from datetime import datetime
from typing import Optional



class MarketingCampaignCreate(BaseModel):

    title: str

    campaign_type: str

    message: str

    target_audience: Optional[str] = None

    discount_percentage: Optional[float] = 0

    start_date: Optional[datetime] = None

    end_date: Optional[datetime] = None





class MarketingCampaignUpdate(BaseModel):

    status: Optional[str] = None

    message: Optional[str] = None





class MarketingCampaignResponse(BaseModel):

    id: int

    title: str

    campaign_type: str

    message: str

    target_audience: Optional[str]

    discount_percentage: float

    start_date: Optional[datetime]

    end_date: Optional[datetime]

    status: str

    created_at: datetime



    class Config:

        from_attributes = True