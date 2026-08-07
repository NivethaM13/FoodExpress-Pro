from datetime import datetime, timedelta

from sqlalchemy.orm import Session

from app.models.scheduled_order import ScheduledOrder



def check_order_reminders(
    db: Session
):

    now = datetime.now()


    schedules = (
        db.query(ScheduledOrder)
        .filter(
            ScheduledOrder.status=="SCHEDULED",
            ScheduledOrder.reminder_sent==False
        )
        .all()
    )


    reminders = []


    for schedule in schedules:


        delivery_datetime = datetime.combine(
            schedule.scheduled_date,
            schedule.scheduled_time
        )


        reminder_datetime = (
            delivery_datetime -
            timedelta(
                minutes=schedule.reminder_time
            )
        )


        if now >= reminder_datetime:


            schedule.reminder_sent = True


            reminders.append(
                schedule.id
            )



    db.commit()


    return reminders