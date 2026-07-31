from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import restaurant_owner_required

from app.models.menu_addon import MenuAddon
from app.models.user import User

from app.schemas.menu_addon_schema import (
    MenuAddonCreate,
    MenuAddonUpdate
)


router = APIRouter(
    prefix="/addons",
    tags=["Menu Addons"]
)



@router.post("/")
def create_addon(
    addon: MenuAddonCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(restaurant_owner_required)
):

    new_addon = MenuAddon(
        menu_id=addon.menu_id,
        addon_name=addon.addon_name,
        addon_price=addon.addon_price,
        is_available=addon.is_available
    )


    db.add(new_addon)
    db.commit()
    db.refresh(new_addon)


    return {
        "message": "Addon added successfully",
        "addon": new_addon
    }



@router.get("/")
def get_addons(
    db: Session = Depends(get_db)
):

    return db.query(MenuAddon).all()



@router.put("/{addon_id}")
def update_addon(
    addon_id: int,
    addon: MenuAddonUpdate,
    db: Session = Depends(get_db),
):

    existing = (
        db.query(MenuAddon)
        .filter(MenuAddon.id == addon_id)
        .first()
    )


    if not existing:
        raise HTTPException(
            status_code=404,
            detail="Addon not found"
        )


    for key,value in addon.model_dump(exclude_unset=True).items():
        setattr(existing,key,value)


    db.commit()
    db.refresh(existing)


    return {
        "message":"Addon updated successfully",
        "addon":existing
    }



@router.delete("/{addon_id}")
def delete_addon(
    addon_id:int,
    db:Session=Depends(get_db)
):

    addon = (
        db.query(MenuAddon)
        .filter(MenuAddon.id==addon_id)
        .first()
    )


    if not addon:
        raise HTTPException(
            status_code=404,
            detail="Addon not found"
        )


    db.delete(addon)
    db.commit()


    return {
        "message":"Addon deleted successfully"
    }