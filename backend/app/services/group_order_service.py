import random
import string

from sqlalchemy.orm import Session

from app.models.group_order import GroupOrder
from app.models.group_participant import GroupParticipant
from app.schemas.group_order_schema import GroupOrderCreate



def generate_invite_code():

    return ''.join(
        random.choices(
            string.ascii_uppercase + string.digits,
            k=8
        )
    )





def create_group_order(
    data: GroupOrderCreate,
    user_id: int,
    db: Session
):

    group_order = GroupOrder(

        creator_id=user_id,

        restaurant_id=data.restaurant_id,

        title=data.title,

        invite_code=generate_invite_code(),

        status="OPEN",

        payment_status="PENDING"

    )


    db.add(group_order)

    db.commit()

    db.refresh(group_order)


    participant = GroupParticipant(

        group_order_id=group_order.id,

        user_id=user_id

    )


    db.add(participant)

    db.commit()


    return group_order