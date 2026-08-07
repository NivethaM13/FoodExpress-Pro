from sqlalchemy.orm import Session

from app.models.route_optimization import RouteOptimization

from app.schemas.route_optimization_schema import (
    RouteOptimizationCreate
)





def calculate_route(

    data: RouteOptimizationCreate,

    db: Session

):


    # Sample calculation logic
    # Later Google Maps API can replace this


    distance = 5.0


    eta = int(distance * 5)



    route = RouteOptimization(

        delivery_assignment_id=data.delivery_assignment_id,

        start_location=data.start_location,

        end_location=data.end_location,

        total_distance_km=distance,

        estimated_time=eta,

        traffic_status="NORMAL",

        route_status="OPTIMIZED"

    )



    db.add(route)

    db.commit()

    db.refresh(route)


    return route







def get_route_history(

    db: Session

):


    return (

        db.query(RouteOptimization)

        .order_by(

            RouteOptimization.created_at.desc()

        )

        .all()

    )