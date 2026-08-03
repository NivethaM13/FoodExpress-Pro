from typing import Optional
from pydantic import BaseModel



class NotificationCreate(BaseModel):

    user_id: int

    title: str

    message: str

    notification_type: str




class NotificationUpdate(BaseModel):

    is_read: bool




class NotificationResponse(BaseModel):

    id: int

    user_id: int

    title: str

    message: str

    notification_type: str

    is_read: bool


    class Config:
        from_attributes = True