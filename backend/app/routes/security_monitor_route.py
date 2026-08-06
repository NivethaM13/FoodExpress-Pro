from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import admin_required

from app.models.audit_log import AuditLog
from app.models.user import User


router = APIRouter(

    prefix="/security-monitor",

    tags=["Security Monitoring"]

)





@router.get("/")
def security_monitor(

    db: Session = Depends(get_db),

    current_admin: User = Depends(admin_required)

):


    total_logs = (
        db.query(AuditLog)
        .count()
    )



    login_events = (
        db.query(AuditLog)
        .filter(
            AuditLog.module == "AUTHENTICATION"
        )
        .count()
    )



    order_events = (
        db.query(AuditLog)
        .filter(
            AuditLog.module == "ORDER"
        )
        .count()
    )



    payment_events = (
        db.query(AuditLog)
        .filter(
            AuditLog.module == "PAYMENT"
        )
        .count()
    )



    admin_events = (
        db.query(AuditLog)
        .filter(
            AuditLog.module == "ADMIN"
        )
        .count()
    )



    recent_activity = (

        db.query(AuditLog)

        .order_by(
            AuditLog.created_at.desc()
        )

        .limit(10)

        .all()

    )



    return {

        "total_logs": total_logs,

        "login_events": login_events,

        "order_events": order_events,

        "payment_events": payment_events,

        "admin_events": admin_events,

        "recent_activity": recent_activity

    }