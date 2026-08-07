from sqlalchemy.orm import Session

from app.models.smart_inventory import SmartInventory

from app.schemas.smart_inventory_schema import (
    SmartInventoryCreate
)





def create_inventory_item(

    data: SmartInventoryCreate,

    db: Session

):


    if data.current_stock <= data.minimum_stock:

        low_status = "LOW STOCK"

        suggestion = (

            f"Purchase more {data.ingredient_name}"

        )

    else:

        low_status = "AVAILABLE"

        suggestion = (

            "Stock level is sufficient"

        )





    inventory = SmartInventory(

        restaurant_id=data.restaurant_id,

        ingredient_name=data.ingredient_name,

        current_stock=data.current_stock,

        minimum_stock=data.minimum_stock,

        unit=data.unit,

        low_stock_status=low_status,

        purchase_suggestion=suggestion,

        expiry_date=data.expiry_date,

        expiry_status="SAFE"

    )


    db.add(inventory)

    db.commit()

    db.refresh(inventory)


    return inventory







def get_inventory_dashboard(

    restaurant_id:int,

    db:Session

):


    return (

        db.query(SmartInventory)

        .filter(

            SmartInventory.restaurant_id == restaurant_id

        )

        .order_by(

            SmartInventory.created_at.desc()

        )

        .all()

    )







def get_low_stock_items(

    restaurant_id:int,

    db:Session

):


    return (

        db.query(SmartInventory)

        .filter(

            SmartInventory.restaurant_id == restaurant_id,

            SmartInventory.low_stock_status == "LOW STOCK"

        )

        .all()

    )