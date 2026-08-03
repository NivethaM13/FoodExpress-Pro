from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import (
    admin_required,
    customer_required
)

from app.models.coupon import Coupon
from app.models.user import User

from app.schemas.coupon_schema import (
    CouponCreate,
    CouponUpdate
)


router = APIRouter(
    prefix="/coupons",
    tags=["Coupons & Offers"]
)



# Create Coupon (Admin)

@router.post("/")
def create_coupon(
    data: CouponCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):

    existing = (
        db.query(Coupon)
        .filter(
            Coupon.code == data.code
        )
        .first()
    )


    if existing:
        raise HTTPException(
            status_code=400,
            detail="Coupon already exists"
        )


    coupon = Coupon(
        code=data.code,
        description=data.description,
        discount_type=data.discount_type,
        discount_value=data.discount_value,
        min_order_amount=data.min_order_amount,
        is_free_delivery=data.is_free_delivery,
        expiry_date=data.expiry_date
    )


    db.add(coupon)
    db.commit()
    db.refresh(coupon)


    return {
        "message":"Coupon created successfully",
        "coupon":coupon
    }





# View Active Coupons (Customer)

@router.get("/")
def get_coupons(
    db: Session = Depends(get_db),
    current_user: User = Depends(customer_required)
):

    coupons = (
        db.query(Coupon)
        .filter(
            Coupon.is_active == True
        )
        .all()
    )


    return coupons





# Update Coupon (Admin)

@router.put("/{coupon_id}")
def update_coupon(
    coupon_id:int,
    data:CouponUpdate,
    db:Session=Depends(get_db),
    current_user:User=Depends(admin_required)
):

    coupon = (
        db.query(Coupon)
        .filter(
            Coupon.id == coupon_id
        )
        .first()
    )


    if not coupon:
        raise HTTPException(
            status_code=404,
            detail="Coupon not found"
        )


    for key,value in data.dict(exclude_unset=True).items():

        setattr(
            coupon,
            key,
            value
        )


    db.commit()


    return {
        "message":"Coupon updated successfully"
    }





# Delete Coupon (Admin)

@router.delete("/{coupon_id}")
def delete_coupon(
    coupon_id:int,
    db:Session=Depends(get_db),
    current_user:User=Depends(admin_required)
):

    coupon = (
        db.query(Coupon)
        .filter(
            Coupon.id == coupon_id
        )
        .first()
    )


    if not coupon:
        raise HTTPException(
            status_code=404,
            detail="Coupon not found"
        )


    db.delete(coupon)
    db.commit()


    return {
        "message":"Coupon deleted successfully"
    }