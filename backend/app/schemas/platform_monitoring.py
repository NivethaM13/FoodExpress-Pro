from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class PlatformMonitoringBase(BaseModel):

    monitor_type: str

    title: str

    description: Optional[str] = None

    api_status: Optional[str] = "RUNNING"

    server_health: Optional[str] = "HEALTHY"

    failed_requests: Optional[int] = 0

    security_alert: Optional[bool] = False

    audit_monitoring: Optional[bool] = False

    backup_status: Optional[str] = "COMPLETED"

    recovery_status: Optional[str] = "READY"



class PlatformMonitoringCreate(
    PlatformMonitoringBase
):
    pass



class PlatformMonitoringResponse(
    PlatformMonitoringBase
):

    id: int

    created_at: datetime


    class Config:
        from_attributes = True