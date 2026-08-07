from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import restaurant_owner_required

from app.models.user import User

from app.schemas.smart_inventory_schema import (
    SmartInventoryCreate
)

from app.services.smart_inventory_service import (
    create_inventory_item,
    get_inventory_dashboard,
    get_low_stock_items
)



router = APIRouter(

    prefix="/smart-inventory",

    tags=["Smart Inventory"]

)





# Add Inventory Item

@router.post("/")
def add_inventory(

    data: SmartInventoryCreate,

    db: Session = Depends(get_db),

    current_user: User = Depends(restaurant_owner_required)

):

    return create_inventory_item(

        data,

        db

    )







# Inventory Dashboard

@router.get("/{restaurant_id}")
def inventory_dashboard(

    restaurant_id:int,

    db:Session = Depends(get_db),

    current_user:User = Depends(restaurant_owner_required)

):

    return get_inventory_dashboard(

        restaurant_id,

        db

    )







# Low Stock Alerts

@router.get("/{restaurant_id}/low-stock")
def low_stock_alerts(

    restaurant_id:int,

    db:Session = Depends(get_db),

    current_user:User = Depends(restaurant_owner_required)

):

    return get_low_stock_items(

        restaurant_id,

        db

    )