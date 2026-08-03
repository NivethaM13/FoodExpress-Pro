from sqlalchemy.orm import Session

from app.models.menu import Menu



# 🔥 Trending Foods

def get_trending_foods(
    db: Session
):

    foods = (

        db.query(Menu)

        .order_by(
            Menu.id.desc()
        )

        .limit(10)

        .all()

    )

    return foods





# 👤 Personalized Recommendation

def get_personalized_foods(
    db: Session,
    user_id:int
):

    foods = (

        db.query(Menu)

        .limit(10)

        .all()

    )

    return foods





# 🌎 Cuisine Suggestions

def get_cuisine_foods(
    db:Session,
    cuisine:str
):

    foods = (

        db.query(Menu)

        .filter(
            Menu.category == cuisine
        )

        .all()

    )

    return foods





# 🍽️ Meal Recommendation

def get_meal_recommendation(
    db:Session,
    meal_type:str
):

    foods = (

        db.query(Menu)

        .filter(
            Menu.meal_type == meal_type
        )

        .all()

    )

    return foods