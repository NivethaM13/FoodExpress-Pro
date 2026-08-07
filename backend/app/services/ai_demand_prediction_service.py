from sqlalchemy.orm import Session

from app.models.ai_demand_prediction import AIDemandPrediction

from app.schemas.ai_demand_prediction_schema import (
    AIDemandPredictionCreate
)





def create_prediction(

    data: AIDemandPredictionCreate,

    db: Session

):


    prediction = AIDemandPrediction(

        restaurant_id=data.restaurant_id,

        peak_hour=data.peak_hour,

        demand_level=data.demand_level,

        predicted_orders=data.predicted_orders,

        popular_food=data.popular_food,

        inventory_suggestion=data.inventory_suggestion,

        seasonal_trend=data.seasonal_trend

    )


    db.add(prediction)

    db.commit()

    db.refresh(prediction)


    return prediction







def get_restaurant_prediction(

    restaurant_id:int,

    db:Session

):


    return (

        db.query(AIDemandPrediction)

        .filter(

            AIDemandPrediction.restaurant_id == restaurant_id

        )

        .order_by(

            AIDemandPrediction.created_at.desc()

        )

        .first()

    )







def get_all_predictions(

    db:Session

):


    return (

        db.query(AIDemandPrediction)

        .order_by(

            AIDemandPrediction.created_at.desc()

        )

        .all()

    )