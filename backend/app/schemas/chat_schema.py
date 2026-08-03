from typing import Optional
from pydantic import BaseModel



class ChatCreate(BaseModel):

    receiver_id: int

    message: Optional[str] = None

    image_url: Optional[str] = None

    chat_type: str




class ChatResponse(BaseModel):

    id: int

    sender_id: int

    receiver_id: int

    message: Optional[str]

    image_url: Optional[str]

    chat_type: str

    is_read: str

    class Config:
        from_attributes = True