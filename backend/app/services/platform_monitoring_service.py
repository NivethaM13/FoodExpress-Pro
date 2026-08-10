from sqlalchemy.orm import Session

from app.models.platform_monitoring import PlatformMonitoring
from app.schemas.platform_monitoring import (
    PlatformMonitoringCreate
)


def create_platform_monitoring(
    data: PlatformMonitoringCreate,
    db: Session
):

    monitoring = PlatformMonitoring(

        monitor_type=data.monitor_type,

        title=data.title,

        description=data.description,

        api_status=data.api_status,

        server_health=data.server_health,

        failed_requests=data.failed_requests,

        security_alert=data.security_alert,

        audit_monitoring=data.audit_monitoring,

        backup_status=data.backup_status,

        recovery_status=data.recovery_status
    )


    db.add(monitoring)

    db.commit()

    db.refresh(monitoring)


    return monitoring



def get_platform_monitoring(
    db: Session
):

    return db.query(
        PlatformMonitoring
    ).all()