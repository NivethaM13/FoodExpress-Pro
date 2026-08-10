from sqlalchemy.orm import Session

from app.models.super_admin_control import SuperAdminControl
from app.schemas.super_admin_control import (
    SuperAdminControlCreate
)



def create_super_admin_control(
    data: SuperAdminControlCreate,
    db: Session
):

    control = SuperAdminControl(

        admin_name=data.admin_name,

        control_type=data.control_type,

        description=data.description,

        manage_restaurants=data.manage_restaurants,

        manage_customers=data.manage_customers,

        manage_delivery_partners=data.manage_delivery_partners,

        platform_settings=data.platform_settings,

        system_monitoring=data.system_monitoring,

        user_verification=data.user_verification,

        status=data.status
    )


    db.add(control)

    db.commit()

    db.refresh(control)


    return control




def get_super_admin_controls(
    db: Session
):

    return db.query(
        SuperAdminControl
    ).all()