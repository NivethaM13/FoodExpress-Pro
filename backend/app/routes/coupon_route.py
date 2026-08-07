from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import (
    admin_required,
    customer_required
)

from app.models.user import User

from app.schemas.coupon_schema import (
    CouponCreate,
    CouponUpdate
)

from app.services.coupon_service import (
    create_coupon,
    get_active_coupons,
    update_coupon,
    delete_coupon,
    apply_coupon
)



router = APIRouter(
    prefix="/coupons",
    tags=["Coupons & Offers"]
)





# CREATE COUPON (ADMIN)

@router.post("/")
def add_coupon(
    data: CouponCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):

    coupon = create_coupon(
        data,
        db
    )


    return {
        "message": "Coupon created successfully",
        "coupon": coupon
    }







# VIEW ACTIVE COUPONS (CUSTOMER)

@router.get("/")
def view_coupons(
    db: Session = Depends(get_db),
    current_user: User = Depends(customer_required)
):

    return get_active_coupons(
        db
    )







# UPDATE COUPON (ADMIN)

@router.put("/{coupon_id}")
def edit_coupon(
    coupon_id: int,
    data: CouponUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):

    coupon = update_coupon(
        coupon_id,
        data,
        db
    )


    if not coupon:

        raise HTTPException(
            status_code=404,
            detail="Coupon not found"
        )


    return {
        "message": "Coupon updated successfully",
        "coupon": coupon
    }







# DELETE COUPON (ADMIN)

@router.delete("/{coupon_id}")
def remove_coupon(
    coupon_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):

    coupon = delete_coupon(
        coupon_id,
        db
    )


    if not coupon:

        raise HTTPException(
            status_code=404,
            detail="Coupon not found"
        )


    return {
        "message": "Coupon deleted successfully"
    }







# APPLY COUPON (CUSTOMER)

@router.post("/apply")
def use_coupon(
    code: str,
    order_amount: float,
    db: Session = Depends(get_db),
    current_user: User = Depends(customer_required)
):

    return apply_coupon(
        code,
        order_amount,
        db
    )