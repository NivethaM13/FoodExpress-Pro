from sqlalchemy.orm import Session

from app.models.delivery_assignment import DeliveryAssignment
from app.models.delivery_partner import DeliveryPartner





def find_best_delivery_partner(

    db: Session

):


    partners = (

        db.query(DeliveryPartner)

        .all()

    )


    if not partners:

        return None



    # Simple load balancing logic

    best_partner = min(

        partners,

        key=lambda x: getattr(
            x,
            "current_orders",
            0
        )

    )


    return best_partner







def assign_delivery_partner(

    order_id:int,

    db:Session

):


    partner = find_best_delivery_partner(

        db

    )


    if not partner:

        return None




    assignment = DeliveryAssignment(

        order_id=order_id,

        delivery_partner_id=partner.id,

        distance_km=0,

        delivery_load=getattr(

            partner,

            "current_orders",

            0

        ),

        assignment_status="ASSIGNED"

    )



    db.add(assignment)

    db.commit()

    db.refresh(assignment)



    return assignment







def reassign_delivery_partner(

    assignment_id:int,

    db:Session

):


    assignment = (

        db.query(DeliveryAssignment)

        .filter(

            DeliveryAssignment.id == assignment_id

        )

        .first()

    )



    if assignment:


        assignment.assignment_status = "REASSIGNED"


        db.commit()

        db.refresh(assignment)



    return assignment