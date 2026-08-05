from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db

from app.schemas.inventory_schema import (
    InventoryCreate,
    InventoryUpdate,
    InventoryResponse
)

from app.services.inventory_service import (
    create_inventory,
    get_inventory,
    get_inventory_by_id,
    update_inventory,
    delete_inventory,
    low_stock_alerts,
    restock_suggestions,
    inventory_report
)



router = APIRouter(
    prefix="/inventory",
    tags=["Inventory Management"]
)





# Add Ingredient

@router.post("/")
def add_inventory(
    data: InventoryCreate,
    db: Session = Depends(get_db)
):

    return create_inventory(
        db,
        data
    )






# View Ingredient Stock

@router.get("/{restaurant_id}")
def view_inventory(
    restaurant_id:int,
    db:Session = Depends(get_db)
):

    return get_inventory(
        db,
        restaurant_id
    )






# Update Stock

@router.put("/{inventory_id}")
def edit_inventory(
    inventory_id:int,
    data:InventoryUpdate,
    db:Session = Depends(get_db)
):

    inventory = update_inventory(
        db,
        inventory_id,
        data
    )


    if not inventory:

        raise HTTPException(
            status_code=404,
            detail="Ingredient not found"
        )


    return inventory






# Delete Ingredient

@router.delete("/{inventory_id}")
def remove_inventory(
    inventory_id:int,
    db:Session = Depends(get_db)
):

    result = delete_inventory(
        db,
        inventory_id
    )


    if not result:

        raise HTTPException(
            status_code=404,
            detail="Ingredient not found"
        )


    return {
        "message":"Ingredient deleted successfully"
    }







# Low Stock Alerts

@router.get("/alerts/{restaurant_id}")
def stock_alerts(
    restaurant_id:int,
    db:Session = Depends(get_db)
):

    return low_stock_alerts(
        db,
        restaurant_id
    )







# Auto Restock Suggestions

@router.get("/restock/{restaurant_id}")
def auto_restock(
    restaurant_id:int,
    db:Session = Depends(get_db)
):

    return restock_suggestions(
        db,
        restaurant_id
    )







# Inventory Reports

@router.get("/report/{restaurant_id}")
def reports(
    restaurant_id:int,
    db:Session = Depends(get_db)
):

    return inventory_report(
        db,
        restaurant_id
    )