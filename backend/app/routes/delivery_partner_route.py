from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import delivery_partner_required

from app.models.delivery_partner import DeliveryPartner
from app.models.user import User

from app.schemas.delivery_partner_schema import (
    DeliveryPartnerCreate,
    DeliveryPartnerUpdate
)


router = APIRouter(
    prefix="/delivery-partner",
    tags=["Delivery Partner Management"]
)



# Register Delivery Partner Profile
@router.post("/")
def create_profile(
    data: DeliveryPartnerCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(delivery_partner_required)
):

    existing = (
        db.query(DeliveryPartner)
        .filter(
            DeliveryPartner.user_id == current_user.id
        )
        .first()
    )


    if existing:
        raise HTTPException(
            status_code=400,
            detail="Profile already exists"
        )


    partner = DeliveryPartner(

        user_id=current_user.id,

        full_name=data.full_name,

        phone=data.phone,

        profile_image=data.profile_image,

        vehicle_type=data.vehicle_type,

        vehicle_number=data.vehicle_number,

        driving_license=data.driving_license

    )


    db.add(partner)

    db.commit()

    db.refresh(partner)


    return {
        "message": "Delivery partner profile created",
        "partner": partner
    }





# View Profile
@router.get("/profile")
def get_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(delivery_partner_required)
):

    partner = (
        db.query(DeliveryPartner)
        .filter(
            DeliveryPartner.user_id == current_user.id
        )
        .first()
    )


    if not partner:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )


    return partner





# Update Profile / Vehicle Details
@router.put("/")
def update_profile(
    data: DeliveryPartnerUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(delivery_partner_required)
):

    partner = (
        db.query(DeliveryPartner)
        .filter(
            DeliveryPartner.user_id == current_user.id
        )
        .first()
    )


    if not partner:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )


    for key, value in data.dict(exclude_unset=True).items():

        setattr(
            partner,
            key,
            value
        )


    db.commit()

    db.refresh(partner)


    return {
        "message": "Profile updated successfully",
        "partner": partner
    }





# Availability Status
@router.put("/availability")
def update_availability(
    status: bool,
    db: Session = Depends(get_db),
    current_user: User = Depends(delivery_partner_required)
):

    partner = (
        db.query(DeliveryPartner)
        .filter(
            DeliveryPartner.user_id == current_user.id
        )
        .first()
    )


    if not partner:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )


    partner.is_available = status


    db.commit()


    return {
        "message": "Availability updated",
        "available": status
    }