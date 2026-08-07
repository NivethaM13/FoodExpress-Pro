from sqlalchemy.orm import Session

from app.models.coupon import Coupon
from app.schemas.coupon_schema import (
    CouponCreate,
    CouponUpdate
)



# CREATE COUPON

def create_coupon(
    data: CouponCreate,
    db: Session
):

    coupon = Coupon(

        code=data.code,

        description=data.description,

        coupon_type=data.coupon_type,

        discount_type=data.discount_type,

        discount_value=data.discount_value,

        min_order_amount=data.min_order_amount,

        is_free_delivery=data.is_free_delivery,

        restaurant_id=data.restaurant_id,

        usage_limit=data.usage_limit,

        expiry_date=data.expiry_date

    )


    db.add(coupon)

    db.commit()

    db.refresh(coupon)


    return coupon





# GET ALL COUPONS

def get_all_coupons(
    db: Session
):

    return db.query(
        Coupon
    ).all()





# GET ACTIVE COUPONS

def get_active_coupons(
    db: Session
):

    return db.query(
        Coupon
    ).filter(
        Coupon.is_active == True
    ).all()





# GET SINGLE COUPON

def get_coupon_by_id(
    coupon_id: int,
    db: Session
):

    return db.query(
        Coupon
    ).filter(
        Coupon.id == coupon_id
    ).first()





# UPDATE COUPON

def update_coupon(
    coupon_id: int,
    data: CouponUpdate,
    db: Session
):

    coupon = db.query(
        Coupon
    ).filter(
        Coupon.id == coupon_id
    ).first()


    if not coupon:
        return None



    if data.description is not None:
        coupon.description = data.description


    if data.discount_value is not None:
        coupon.discount_value = data.discount_value


    if data.is_active is not None:
        coupon.is_active = data.is_active


    if data.expiry_date is not None:
        coupon.expiry_date = data.expiry_date



    db.commit()

    db.refresh(coupon)


    return coupon





# DELETE COUPON

def delete_coupon(
    coupon_id: int,
    db: Session
):

    coupon = db.query(
        Coupon
    ).filter(
        Coupon.id == coupon_id
    ).first()


    if coupon:

        db.delete(coupon)

        db.commit()


    return coupon





# APPLY COUPON

def apply_coupon(
    code: str,
    order_amount: float,
    db: Session
):

    coupon = db.query(
        Coupon
    ).filter(
        Coupon.code == code,
        Coupon.is_active == True
    ).first()



    if not coupon:

        return {
            "message": "Invalid coupon"
        }




    if order_amount < coupon.min_order_amount:

        return {
            "message": "Minimum order amount not reached"
        }




    discount = 0



    if coupon.discount_type == "PERCENTAGE":

        discount = (
            order_amount *
            coupon.discount_value /
            100
        )


    elif coupon.discount_type == "FLAT":

        discount = coupon.discount_value



    elif coupon.discount_type == "CASHBACK":

        discount = coupon.discount_value



    return {

        "coupon": coupon.code,

        "discount": discount,

        "final_amount": order_amount - discount

    }