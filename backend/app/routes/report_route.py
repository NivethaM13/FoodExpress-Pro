from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session


from fastapi.responses import FileResponse

from app.services.report_export_service import (
    export_pdf,
    export_excel,
    export_csv
)


from app.config.database import get_db

from app.schemas.report_schema import (
    ReportCreate,
    ReportResponse
)

from app.services.report_service import (
    create_report,
    get_sales_report,
    get_restaurant_report,
    get_delivery_report,
    get_customer_report
)



router = APIRouter(

    prefix="/reports",

    tags=["Reports"]

)





# Create Report

@router.post("/")
def add_report(

    data: ReportCreate,

    db: Session = Depends(get_db)

):

    return create_report(

        db,

        data

    )







# Sales Report

@router.get("/sales")
def sales_report(

    db: Session = Depends(get_db)

):

    return get_sales_report(db)







# Restaurant Report

@router.get("/restaurants")
def restaurant_report(

    db: Session = Depends(get_db)

):

    return get_restaurant_report(db)







# Delivery Report

@router.get("/delivery")
def delivery_report(

    db: Session = Depends(get_db)

):

    return get_delivery_report(db)







# Customer Report

@router.get("/customers")
def customer_report(

    db: Session = Depends(get_db)

):

    return get_customer_report(db)


    # Export PDF

@router.get("/export/pdf")
def export_report_pdf():

    data = {

        "Report": "Sales Report",

        "Total Orders": 100,

        "Revenue": 50000

    }


    file = "sales_report.pdf"


    export_pdf(

        data,

        file

    )


    return FileResponse(

        file,

        media_type="application/pdf",

        filename=file

    )







# Export Excel

@router.get("/export/excel")
def export_report_excel():

    data = {

        "Report": "Sales Report",

        "Total Orders": 100,

        "Revenue": 50000

    }


    file = "sales_report.xlsx"


    export_excel(

        data,

        file

    )


    return FileResponse(

        file,

        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

        filename=file

    )







# Export CSV

@router.get("/export/csv")
def export_report_csv():

    data = {

        "Report": "Sales Report",

        "Total Orders": 100,

        "Revenue": 50000

    }


    file = "sales_report.csv"


    export_csv(

        data,

        file

    )


    return FileResponse(

        file,

        media_type="text/csv",

        filename=file

    )