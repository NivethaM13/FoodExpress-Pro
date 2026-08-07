from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import customer_required

from app.models.user import User
from app.models.group_order import GroupOrder
from app.models.group_participant import GroupParticipant

from app.schemas.group_order_schema import (
    GroupOrderCreate,
    JoinGroupOrder
)

from app.services.group_order_service import (
    create_group_order
)



router = APIRouter(
    prefix="/group-orders",
    tags=["Group Ordering"]
)






# Create Group Order

@router.post("/")
def create_order(
    data: GroupOrderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(customer_required)
):

    group = create_group_order(
        data,
        current_user.id,
        db
    )


    return {

        "message": "Group order created successfully",

        "group_order_id": group.id,

        "creator_id": group.creator_id,

        "restaurant_id": group.restaurant_id,

        "title": group.title,

        "invite_code": group.invite_code,

        "status": group.status,

        "payment_status": group.payment_status,

        "created_at": group.created_at

    }








# Join Group Order

@router.post("/join")
def join_group_order(
    data: JoinGroupOrder,
    db: Session = Depends(get_db),
    current_user: User = Depends(customer_required)
):

    group = (

        db.query(GroupOrder)

        .filter(
            GroupOrder.invite_code == data.invite_code
        )

        .first()

    )


    if not group:

        raise HTTPException(

            status_code=404,

            detail="Invalid invite code"

        )




    existing = (

        db.query(GroupParticipant)

        .filter(

            GroupParticipant.group_order_id == group.id,

            GroupParticipant.user_id == current_user.id

        )

        .first()

    )



    if existing:

        raise HTTPException(

            status_code=400,

            detail="Already joined this group"

        )





    participant = GroupParticipant(

        group_order_id=group.id,

        user_id=current_user.id

    )



    db.add(participant)

    db.commit()



    return {

        "message": "Joined group order successfully",

        "group_order_id": group.id,

        "invite_code": group.invite_code

    }









# View My Group Orders

@router.get("/")
def get_my_groups(

    db: Session = Depends(get_db),

    current_user: User = Depends(customer_required)

):


    groups = (

        db.query(GroupOrder)

        .join(

            GroupParticipant

        )

        .filter(

            GroupParticipant.user_id == current_user.id

        )

        .all()

    )


    return [

        {

            "id": group.id,

            "title": group.title,

            "restaurant_id": group.restaurant_id,

            "invite_code": group.invite_code,

            "status": group.status,

            "payment_status": group.payment_status,

            "created_at": group.created_at

        }

        for group in groups

    ]