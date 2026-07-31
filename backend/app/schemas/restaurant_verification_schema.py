from typing import Optional
from pydantic import BaseModel


class VerificationCreate(BaseModel):

    gst_number: str

    license_number: str

    gst_document: Optional[str] = None

    license_document: Optional[str] = None



class VerificationUpdate(BaseModel):

    verification_status: str

    admin_comment: Optional[str] = None



class VerificationResponse(BaseModel):

    id: int

    restaurant_id: int

    gst_number: str

    license_number: str

    gst_document: Optional[str]

    license_document: Optional[str]

    verification_status: str

    admin_comment: Optional[str]

    class Config:
        from_attributes = True