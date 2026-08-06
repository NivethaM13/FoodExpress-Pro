from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import admin_required

from app.models.user import User

from app.schemas.audit_log_schema import (
    AuditLogCreate
)

from app.services.audit_log_service import (
    create_audit_log,
    get_all_audit_logs
)



router = APIRouter(

    prefix="/audit-logs",

    tags=["Audit Logs"]

)





# Create Audit Log

@router.post("/")
def add_audit_log(

    data: AuditLogCreate,

    db: Session = Depends(get_db),

    current_admin: User = Depends(admin_required)

):

    return create_audit_log(

        db,

        data

    )







# View All Audit Logs

@router.get("/")
def view_audit_logs(

    db: Session = Depends(get_db),

    current_admin: User = Depends(admin_required)

):

    return get_all_audit_logs(db)