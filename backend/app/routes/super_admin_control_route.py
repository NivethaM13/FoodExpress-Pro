from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db

from app.schemas.super_admin_control import (
    SuperAdminControlCreate,
    SuperAdminControlResponse
)

from app.services.super_admin_control_service import (
    create_super_admin_control,
    get_super_admin_controls
)


router = APIRouter(
    prefix="/super-admin",
    tags=["Super Admin Control"]
)



@router.post(
    "/",
    response_model=SuperAdminControlResponse
)
def add_super_admin_control(
    data: SuperAdminControlCreate,
    db: Session = Depends(get_db)
):

    return create_super_admin_control(
        data,
        db
    )




@router.get(
    "/",
    response_model=list[SuperAdminControlResponse]
)
def list_super_admin_controls(
    db: Session = Depends(get_db)
):

    return get_super_admin_controls(
        db
    )