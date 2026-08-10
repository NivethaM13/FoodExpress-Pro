from sqlalchemy.orm import Session

from app.models.marketing_campaign import MarketingCampaign

from app.schemas.marketing_campaign import (
    MarketingCampaignCreate,
    MarketingCampaignUpdate
)




# Create Campaign

def create_campaign(
    data: MarketingCampaignCreate,
    db: Session
):

    campaign = MarketingCampaign(

        title=data.title,

        campaign_type=data.campaign_type,

        message=data.message,

        target_audience=data.target_audience,

        discount_percentage=data.discount_percentage,

        start_date=data.start_date,

        end_date=data.end_date

    )


    db.add(campaign)

    db.commit()

    db.refresh(campaign)


    return campaign







# Get All Campaigns

def get_campaigns(
    db: Session
):

    return db.query(
        MarketingCampaign
    ).all()








# Get Active Campaigns

def get_active_campaigns(
    db: Session
):

    return db.query(
        MarketingCampaign
    ).filter(
        MarketingCampaign.status=="ACTIVE"
    ).all()








# Update Campaign

def update_campaign(
    campaign_id: int,
    data: MarketingCampaignUpdate,
    db: Session
):


    campaign = db.query(
        MarketingCampaign
    ).filter(
        MarketingCampaign.id == campaign_id
    ).first()



    if not campaign:

        return None



    if data.status:

        campaign.status = data.status



    if data.message:

        campaign.message = data.message



    db.commit()

    db.refresh(campaign)


    return campaign