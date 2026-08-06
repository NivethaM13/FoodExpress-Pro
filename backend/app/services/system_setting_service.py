from sqlalchemy.orm import Session

from app.models.system_setting import SystemSetting
from app.schemas.system_setting_schema import SystemSettingCreate



# Create Setting

def create_setting(
    data: SystemSettingCreate,
    db: Session
):

    setting = SystemSetting(

        setting_key=data.setting_key,

        setting_value=data.setting_value,

        setting_type=data.setting_type,

        description=data.description

    )


    db.add(setting)

    db.commit()

    db.refresh(setting)


    return setting





# Get All Settings

def get_settings(
    db: Session
):

    return (
        db.query(SystemSetting)
        .all()
    )





# Get Single Setting

def get_setting_by_key(
    key: str,
    db: Session
):

    return (
        db.query(SystemSetting)
        .filter(
            SystemSetting.setting_key == key
        )
        .first()
    )





# Update Setting

def update_setting(
    setting_id: int,
    data: SystemSettingCreate,
    db: Session
):

    setting = (
        db.query(SystemSetting)
        .filter(
            SystemSetting.id == setting_id
        )
        .first()
    )


    if setting:

        setting.setting_key = data.setting_key

        setting.setting_value = data.setting_value

        setting.setting_type = data.setting_type

        setting.description = data.description


        db.commit()

        db.refresh(setting)


    return setting





# Delete Setting

def delete_setting(
    setting_id: int,
    db: Session
):

    setting = (
        db.query(SystemSetting)
        .filter(
            SystemSetting.id == setting_id
        )
        .first()
    )


    if setting:

        db.delete(setting)

        db.commit()


    return setting