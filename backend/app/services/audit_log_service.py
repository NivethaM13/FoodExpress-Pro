from sqlalchemy.orm import Session

from app.models.audit_log import AuditLog
from app.schemas.audit_log_schema import AuditLogCreate



def create_audit_log(
    db: Session,
    data: AuditLogCreate
):

    log = AuditLog(

        user_id=data.user_id,

        action=data.action,

        module=data.module,

        description=data.description,

        ip_address=data.ip_address

    )


    db.add(log)

    db.commit()

    db.refresh(log)


    return log





def get_all_audit_logs(
    db: Session
):

    return (
        db.query(AuditLog)
        .order_by(
            AuditLog.created_at.desc()
        )
        .all()
    )