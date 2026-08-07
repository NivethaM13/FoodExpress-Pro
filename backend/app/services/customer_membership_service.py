from sqlalchemy.orm import Session

from app.models.customer_membership import CustomerMembership

from app.schemas.customer_membership_schema import (
    CustomerMembershipCreate
)





def create_membership(

    data: CustomerMembershipCreate,

    db: Session

):


    if data.membership_type == "SILVER":

        data.discount_percentage = 10

        data.free_delivery = False

        benefits = "Basic Discounts"



    elif data.membership_type == "GOLD":

        data.discount_percentage = 20

        data.free_delivery = True

        benefits = "Free Delivery + Exclusive Discounts"



    elif data.membership_type == "PLATINUM":

        data.discount_percentage = 30

        data.free_delivery = True

        benefits = "Premium Offers + Priority Delivery"



    else:

        benefits = data.exclusive_benefits





    membership = CustomerMembership(

        customer_id=data.customer_id,

        membership_type=data.membership_type,

        membership_price=data.membership_price,

        discount_percentage=data.discount_percentage,

        free_delivery=data.free_delivery,

        exclusive_benefits=benefits,

        expiry_date=data.expiry_date,

        membership_status="ACTIVE"

    )


    db.add(membership)

    db.commit()

    db.refresh(membership)


    return membership







def get_customer_membership(

    customer_id:int,

    db:Session

):


    return (

        db.query(CustomerMembership)

        .filter(

            CustomerMembership.customer_id == customer_id

        )

        .order_by(

            CustomerMembership.created_at.desc()

        )

        .first()

    )







def get_all_memberships(

    db:Session

):


    return (

        db.query(CustomerMembership)

        .order_by(

            CustomerMembership.created_at.desc()

        )

        .all()

    )