from sqlalchemy.orm import Session

from app.models.group_cart import GroupCart
from app.models.menu import Menu

from app.schemas.group_cart_schema import GroupCartCreate





def add_group_cart_item(
    data: GroupCartCreate,
    user_id: int,
    db: Session
):


    menu = (

        db.query(Menu)

        .filter(
            Menu.id == data.menu_id
        )

        .first()

    )


    if not menu:

        return None



    item = GroupCart(

        group_order_id=data.group_order_id,

        user_id=user_id,

        menu_id=data.menu_id,

        quantity=data.quantity,

        price=menu.price

    )


    db.add(item)

    db.commit()

    db.refresh(item)


    return item







def get_group_cart(
    group_order_id:int,
    db:Session
):


    return (

        db.query(GroupCart)

        .filter(

            GroupCart.group_order_id == group_order_id

        )

        .all()

    )