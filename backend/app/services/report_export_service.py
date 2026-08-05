from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
from openpyxl import Workbook
import csv



# PDF Export

def export_pdf(data, filename):

    pdf = SimpleDocTemplate(filename)


    table_data = [

        list(data.keys()),

        list(data.values())

    ]


    table = Table(table_data)


    pdf.build([table])


    return filename







# Excel Export

def export_excel(data, filename):

    workbook = Workbook()


    sheet = workbook.active


    sheet.append(
        list(data.keys())
    )


    sheet.append(
        list(data.values())
    )


    workbook.save(filename)


    return filename







# CSV Export

def export_csv(data, filename):

    with open(
        filename,
        "w",
        newline=""
    ) as file:


        writer = csv.writer(file)


        writer.writerow(
            data.keys()
        )


        writer.writerow(
            data.values()
        )


    return filename