from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import get_current_user

from app.models.chat import Chat
from app.models.user import User
from app.models.notification import Notification

from app.schemas.chat_schema import ChatCreate


router = APIRouter(
    prefix="/chats",
    tags=["Chat"]
)



# Send Message

@router.post("/")
def send_message(
    data: ChatCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    chat = Chat(

        sender_id=current_user.id,

        receiver_id=data.receiver_id,

        message=data.message,

        image_url=data.image_url,

        chat_type=data.chat_type

    )


    db.add(chat)

    db.commit()

    db.refresh(chat)



    # Create Chat Notification

    notification = Notification(

        user_id=data.receiver_id,

        title="New Chat Message 💬",

        message=f"New message from user {current_user.id}",

        notification_type="CHAT"

    )


    db.add(notification)

    db.commit()



    return {

        "message": "Message sent successfully",

        "chat": chat

    }





# Get Chat History

@router.get("/{user_id}")
def get_chat_history(
    user_id:int,
    db:Session = Depends(get_db),
    current_user:User = Depends(get_current_user)
):

    chats = (
        db.query(Chat)
        .filter(
            (
                (Chat.sender_id == current_user.id)
                &
                (Chat.receiver_id == user_id)
            )
            |
            (
                (Chat.sender_id == user_id)
                &
                (Chat.receiver_id == current_user.id)
            )
        )
        .order_by(
            Chat.created_at.asc()
        )
        .all()
    )


    return chats





# Mark Chat Read

@router.put("/{chat_id}/read")
def mark_chat_read(
    chat_id:int,
    db:Session=Depends(get_db),
    current_user:User=Depends(get_current_user)
):

    chat = (
        db.query(Chat)
        .filter(
            Chat.id == chat_id
        )
        .first()
    )


    if not chat:

        raise HTTPException(
            status_code=404,
            detail="Message not found"
        )


    chat.is_read="READ"


    db.commit()


    return {

        "message":"Message marked as read"

    }