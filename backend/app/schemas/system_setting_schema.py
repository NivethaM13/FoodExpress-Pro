from pydantic import BaseModel
from datetime import datetime


class SystemSettingCreate(BaseModel):

    setting_key: str

    setting_value: str

    setting_type: str

    description: str | None = None



class SystemSettingResponse(BaseModel):

    id: int

    setting_key: str

    setting_value: str

    setting_type: str

    description: str | None

    is_active: bool

    created_at: datetime


    class Config:
        from_attributes = True