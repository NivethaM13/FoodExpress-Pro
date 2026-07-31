from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import (
    restaurant_owner_required,
    admin_required,
)

from app.models.user import User
from app.models.restaurant import Restaurant
from app.models.restaurant_verification import RestaurantVerification

from app.schemas.restaurant_verification_schema import (
    VerificationCreate,
    VerificationUpdate,
)


router = APIRouter(
    prefix="/verification",
    tags=["Restaurant Verification"]
)


# ---------------------------------
# Restaurant Owner Submit Verification
# ---------------------------------

@router.post("/")
def submit_verification(
    data: VerificationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(restaurant_owner_required),
):

    restaurant = (
        db.query(Restaurant)
        .filter(
            Restaurant.owner_id == current_user.id
        )
        .first()
    )


    if not restaurant:
        raise HTTPException(
            status_code=404,
            detail="Restaurant not found"
        )


    existing = (
        db.query(RestaurantVerification)
        .filter(
            RestaurantVerification.restaurant_id
            == restaurant.id
        )
        .first()
    )


    if existing:
        raise HTTPException(
            status_code=400,
            detail="Verification already submitted"
        )


    verification = RestaurantVerification(
        restaurant_id=restaurant.id,
        gst_number=data.gst_number,
        license_number=data.license_number,
        gst_document=data.gst_document,
        license_document=data.license_document,
        verification_status="PENDING"
    )


    db.add(verification)
    db.commit()
    db.refresh(verification)


    return {
        "message": "Verification submitted successfully",
        "verification": verification
    }



# ---------------------------------
# Restaurant Owner View Status
# ---------------------------------

@router.get("/my")
def get_my_verification(
    db: Session = Depends(get_db),
    current_user: User = Depends(restaurant_owner_required),
):

    restaurant = (
        db.query(Restaurant)
        .filter(
            Restaurant.owner_id == current_user.id
        )
        .first()
    )


    if not restaurant:
        raise HTTPException(
            status_code=404,
            detail="Restaurant not found"
        )


    verification = (
        db.query(RestaurantVerification)
        .filter(
            RestaurantVerification.restaurant_id
            == restaurant.id
        )
        .first()
    )


    if not verification:
        raise HTTPException(
            status_code=404,
            detail="Verification not submitted"
        )


    return verification



# ---------------------------------
# Admin View All Verification Requests
# ---------------------------------

@router.get("/admin/all")
def get_all_verifications(
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):

    return db.query(
        RestaurantVerification
    ).all()



# ---------------------------------
# Admin Approve / Reject
# ---------------------------------

@router.put("/admin/{verification_id}")
def update_verification_status(
    verification_id: int,
    data: VerificationUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):

    verification = (
        db.query(RestaurantVerification)
        .filter(
            RestaurantVerification.id
            == verification_id
        )
        .first()
    )


    if not verification:
        raise HTTPException(
            status_code=404,
            detail="Verification not found"
        )


    verification.verification_status = (
        data.verification_status
    )

    verification.admin_comment = (
        data.admin_comment
    )


    db.commit()
    db.refresh(verification)


    return {
        "message": "Verification updated successfully",
        "verification": verification
    }