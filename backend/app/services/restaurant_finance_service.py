from sqlalchemy.orm import Session

from app.models.restaurant_finance import RestaurantFinance

from app.schemas.restaurant_finance_schema import (
    RestaurantFinanceCreate
)





def create_financial_report(

    data: RestaurantFinanceCreate,

    db: Session

):


    profit = (

        data.total_revenue -

        data.total_expense

    )



    finance = RestaurantFinance(

        restaurant_id=data.restaurant_id,

        total_revenue=data.total_revenue,

        total_expense=data.total_expense,

        profit_amount=profit,

        tax_amount=data.tax_amount,

        report_period=data.report_period,

        financial_status="ACTIVE"

    )


    db.add(finance)

    db.commit()

    db.refresh(finance)


    return finance







def get_financial_report(

    restaurant_id:int,

    db:Session

):


    return (

        db.query(RestaurantFinance)

        .filter(

            RestaurantFinance.restaurant_id == restaurant_id

        )

        .order_by(

            RestaurantFinance.created_at.desc()

        )

        .first()

    )







def get_all_financial_reports(

    db:Session

):


    return (

        db.query(RestaurantFinance)

        .order_by(

            RestaurantFinance.created_at.desc()

        )

        .all()

    )