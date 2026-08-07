from sqlalchemy.orm import Session

from app.models.restaurant_performance import RestaurantPerformance

from app.schemas.restaurant_performance_schema import (
    RestaurantPerformanceCreate
)





def create_performance(

    data: RestaurantPerformanceCreate,

    db: Session

):


    performance = RestaurantPerformance(

        restaurant_id=data.restaurant_id,

        daily_sales=data.daily_sales,

        weekly_revenue=data.weekly_revenue,

        monthly_revenue=data.monthly_revenue,

        popular_dish=data.popular_dish,

        customer_growth=data.customer_growth

    )


    db.add(performance)

    db.commit()

    db.refresh(performance)


    return performance







def get_restaurant_performance(

    restaurant_id:int,

    db:Session

):


    return (

        db.query(RestaurantPerformance)

        .filter(

            RestaurantPerformance.restaurant_id == restaurant_id

        )

        .order_by(

            RestaurantPerformance.created_at.desc()

        )

        .first()

    )







def get_all_performance(

    db:Session

):


    return (

        db.query(RestaurantPerformance)

        .order_by(

            RestaurantPerformance.created_at.desc()

        )

        .all()

    )