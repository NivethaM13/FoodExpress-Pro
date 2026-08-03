from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import customer_required

from app.models.notification import Notification
from app.models.user import User

from app.schemas.notification_schema import (
    NotificationCreate,
    NotificationUpdate
)


router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)



# Create Notification

@router.post("/")
def create_notification(
    data: NotificationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(customer_required)
):

    notification = Notification(

        user_id=data.user_id,

        title=data.title,

        message=data.message,

        notification_type=data.notification_type

    )


    db.add(notification)

    db.commit()

    db.refresh(notification)


    return {
        "message":"Notification created successfully",
        "notification":notification
    }





# View My Notifications

@router.get("/")
def get_notifications(
    db:Session = Depends(get_db),
    current_user:User = Depends(customer_required)
):

    notifications = (
        db.query(Notification)
        .filter(
            Notification.user_id == current_user.id
        )
        .order_by(
            Notification.created_at.desc()
        )
        .all()
    )


    return notifications





# Mark Notification Read

@router.put("/{notification_id}/read")
def mark_read(
    notification_id:int,
    db:Session=Depends(get_db),
    current_user:User=Depends(customer_required)
):

    notification = (
        db.query(Notification)
        .filter(
            Notification.id == notification_id
        )
        .first()
    )


    if not notification:

        raise HTTPException(
            status_code=404,
            detail="Notification not found"
        )


    notification.is_read = True


    db.commit()


    return {
        "message":"Notification marked as read"
    }