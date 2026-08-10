from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db

from app.schemas.platform_monitoring import (
    PlatformMonitoringCreate,
    PlatformMonitoringResponse
)

from app.services.platform_monitoring_service import (
    create_platform_monitoring,
    get_platform_monitoring
)


router = APIRouter(
    prefix="/platform-monitoring",
    tags=["Platform Monitoring & Security"]
)



@router.post(
    "/",
    response_model=PlatformMonitoringResponse
)
def add_platform_monitoring(
    data: PlatformMonitoringCreate,
    db: Session = Depends(get_db)
):

    return create_platform_monitoring(
        data,
        db
    )



@router.get(
    "/",
    response_model=list[PlatformMonitoringResponse]
)
def list_platform_monitoring(
    db: Session = Depends(get_db)
):

    return get_platform_monitoring(
        db
    )