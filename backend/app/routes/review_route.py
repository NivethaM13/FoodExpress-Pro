from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import customer_required, admin_required

from app.models.review import Review
from app.models.user import User

from app.schemas.review_schema import (
    ReviewCreate,
    ReviewUpdate
)


router = APIRouter(
    prefix="/reviews",
    tags=["Reviews & Ratings"]
)



# Add Review (Customer)

@router.post("/")
def add_review(
    data: ReviewCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(customer_required)
):

    review = Review(

        user_id=current_user.id,

        restaurant_id=data.restaurant_id,

        order_id=data.order_id,

        restaurant_rating=data.restaurant_rating,

        food_rating=data.food_rating,

        delivery_rating=data.delivery_rating,

        comment=data.comment

    )


    db.add(review)

    db.commit()

    db.refresh(review)


    return {
        "message":"Review added successfully",
        "review":review
    }





# View Restaurant Reviews

@router.get("/{restaurant_id}")
def get_reviews(
    restaurant_id:int,
    db:Session=Depends(get_db)
):

    reviews = (
        db.query(Review)
        .filter(
            Review.restaurant_id == restaurant_id
        )
        .all()
    )


    return reviews





# Update Review (Customer)

@router.put("/{review_id}")
def update_review(
    review_id:int,
    data:ReviewUpdate,
    db:Session=Depends(get_db),
    current_user:User=Depends(customer_required)
):

    review = (
        db.query(Review)
        .filter(
            Review.id == review_id
        )
        .first()
    )


    if not review:

        raise HTTPException(
            status_code=404,
            detail="Review not found"
        )


    for key,value in data.dict(exclude_unset=True).items():

        setattr(
            review,
            key,
            value
        )


    db.commit()


    return {
        "message":"Review updated successfully"
    }





# Delete Review (Admin)

@router.delete("/{review_id}")
def delete_review(
    review_id:int,
    db:Session=Depends(get_db),
    current_user:User=Depends(admin_required)
):

    review = (
        db.query(Review)
        .filter(
            Review.id == review_id
        )
        .first()
    )


    if not review:

        raise HTTPException(
            status_code=404,
            detail="Review not found"
        )


    db.delete(review)

    db.commit()


    return {
        "message":"Review deleted successfully"
    }