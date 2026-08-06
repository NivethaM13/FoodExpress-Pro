from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import admin_required

from app.models.user import User

from app.schemas.system_setting_schema import (
    SystemSettingCreate
)

from app.services.system_setting_service import (
    create_setting,
    get_settings,
    get_setting_by_key,
    update_setting,
    delete_setting
)



router = APIRouter(
    prefix="/system-settings",
    tags=["System Settings"]
)





# Create Setting

@router.post("/")
def add_setting(

    data: SystemSettingCreate,

    db: Session = Depends(get_db),

    current_admin: User = Depends(admin_required)

):

    return create_setting(
        data,
        db
    )







# Get All Settings

@router.get("/")
def read_settings(

    db: Session = Depends(get_db),

    current_admin: User = Depends(admin_required)

):

    return get_settings(db)







# Get By Key

@router.get("/{key}")
def read_setting(

    key: str,

    db: Session = Depends(get_db),

    current_admin: User = Depends(admin_required)

):

    setting = get_setting_by_key(
        key,
        db
    )


    if not setting:

        raise HTTPException(
            status_code=404,
            detail="Setting not found"
        )


    return setting







# Update Setting

@router.put("/{setting_id}")
def edit_setting(

    setting_id: int,

    data: SystemSettingCreate,

    db: Session = Depends(get_db),

    current_admin: User = Depends(admin_required)

):

    return update_setting(
        setting_id,
        data,
        db
    )







# Delete Setting

@router.delete("/{setting_id}")
def remove_setting(

    setting_id: int,

    db: Session = Depends(get_db),

    current_admin: User = Depends(admin_required)

):

    return delete_setting(
        setting_id,
        db
    )