from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.config.database import get_db

from app.schemas.marketing_campaign import (
    MarketingCampaignCreate,
    MarketingCampaignResponse,
    MarketingCampaignUpdate
)

from app.services.marketing_campaign_service import (
    create_campaign,
    get_campaigns,
    get_active_campaigns,
    update_campaign
)



router = APIRouter(
    prefix="/marketing-campaigns",
    tags=["Marketing Campaigns"]
)





# Create Campaign

@router.post(
    "/",
    response_model=MarketingCampaignResponse
)
def add_campaign(
    data: MarketingCampaignCreate,
    db: Session = Depends(get_db)
):

    return create_campaign(
        data,
        db
    )







# Get All Campaigns

@router.get(
    "/",
    response_model=list[MarketingCampaignResponse]
)
def all_campaigns(
    db: Session = Depends(get_db)
):

    return get_campaigns(
        db
    )







# Get Active Campaigns

@router.get(
    "/active",
    response_model=list[MarketingCampaignResponse]
)
def active_campaigns(
    db: Session = Depends(get_db)
):

    return get_active_campaigns(
        db
    )







# Update Campaign

@router.put(
    "/{campaign_id}",
    response_model=MarketingCampaignResponse
)
def update_campaign_status(
    campaign_id: int,
    data: MarketingCampaignUpdate,
    db: Session = Depends(get_db)
):

    return update_campaign(
        campaign_id,
        data,
        db
    )