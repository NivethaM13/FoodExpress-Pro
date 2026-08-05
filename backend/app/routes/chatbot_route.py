from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.config.database import get_db
from app.config.security import get_current_user

from app.models.user import User
from app.models.chatbot import ChatbotMessage

from app.schemas.chatbot_schema import ChatbotRequest

from app.services.chatbot_service import chatbot_reply



router = APIRouter(

    prefix="/chatbot",

    tags=["AI Chatbot"]

)


# Chatbot History

@router.get("/history")
def chatbot_history(

    db:Session = Depends(get_db),

    current_user:User = Depends(get_current_user)

):


    history = (

        db.query(ChatbotMessage)

        .filter(

            ChatbotMessage.user_id == current_user.id

        )

        .order_by(

            ChatbotMessage.created_at.asc()

        )

        .all()

    )


    return history


@router.post("/")
def chat(

    data:ChatbotRequest,

    db:Session = Depends(get_db),

    current_user:User = Depends(get_current_user)

):


    result = chatbot_reply(
        data.message
    )



    chat = ChatbotMessage(

        user_id=current_user.id,

        user_message=data.message,

        bot_response=result["response"],

        category=result["category"]

    )


    db.add(chat)

    db.commit()



    return result