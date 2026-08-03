from fastapi import APIRouter, UploadFile, File
import os
import shutil
import uuid


router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


UPLOAD_FOLDER = "uploads/chat_images"


os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)



@router.post("/chat-image")
def upload_chat_image(
    file: UploadFile = File(...)
):

    file_name = (
        str(uuid.uuid4())
        +
        "_"
        +
        file.filename
    )


    file_path = os.path.join(
        UPLOAD_FOLDER,
        file_name
    )


    with open(file_path,"wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )


    return {

        "image_url":
        f"/uploads/chat_images/{file_name}"

    }