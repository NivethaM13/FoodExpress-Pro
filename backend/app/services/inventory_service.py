from sqlalchemy.orm import Session

from app.models.inventory import Inventory
from app.schemas.inventory_schema import (
    InventoryCreate,
    InventoryUpdate
)



# Create Ingredient

def create_inventory(
    db: Session,
    data: InventoryCreate
):

    inventory = Inventory(

        restaurant_id=data.restaurant_id,

        ingredient_name=data.ingredient_name,

        quantity=data.quantity,

        unit=data.unit,

        minimum_stock=data.minimum_stock,

        supplier_name=data.supplier_name,

        supplier_contact=data.supplier_contact,

        price=data.price

    )


    db.add(inventory)

    db.commit()

    db.refresh(inventory)


    return inventory





# Get All Ingredients

def get_inventory(
    db: Session,
    restaurant_id: int
):

    return (

        db.query(Inventory)

        .filter(
            Inventory.restaurant_id == restaurant_id
        )

        .all()

    )





# Get Single Ingredient

def get_inventory_by_id(
    db: Session,
    inventory_id: int
):

    return (

        db.query(Inventory)

        .filter(
            Inventory.id == inventory_id
        )

        .first()

    )





# Update Ingredient

def update_inventory(
    db: Session,
    inventory_id: int,
    data: InventoryUpdate
):

    inventory = get_inventory_by_id(
        db,
        inventory_id
    )


    if not inventory:
        return None



    for key, value in data.dict(
        exclude_unset=True
    ).items():

        setattr(
            inventory,
            key,
            value
        )


    db.commit()

    db.refresh(inventory)


    return inventory





# Delete Ingredient

def delete_inventory(
    db: Session,
    inventory_id: int
):

    inventory = get_inventory_by_id(
        db,
        inventory_id
    )


    if not inventory:
        return None



    db.delete(inventory)

    db.commit()


    return True





# Low Stock Alert

def low_stock_alerts(
    db: Session,
    restaurant_id: int
):

    return (

        db.query(Inventory)

        .filter(

            Inventory.restaurant_id == restaurant_id,

            Inventory.quantity <= Inventory.minimum_stock

        )

        .all()

    )





# Auto Restock Suggestions

def restock_suggestions(
    db: Session,
    restaurant_id: int
):

    items = low_stock_alerts(
        db,
        restaurant_id
    )


    suggestions = []


    for item in items:

        suggestions.append({

            "ingredient":
            item.ingredient_name,


            "current_stock":
            item.quantity,


            "suggested_quantity":
            item.minimum_stock * 2

        })


    return suggestions





# Inventory Report

def inventory_report(
    db: Session,
    restaurant_id: int
):

    items = get_inventory(
        db,
        restaurant_id
    )


    total_items = len(items)


    total_value = sum(

        item.quantity * item.price

        for item in items

    )


    return {

        "total_ingredients": total_items,

        "inventory_value": total_value

    }