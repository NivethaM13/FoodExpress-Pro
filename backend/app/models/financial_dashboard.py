from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime

from app.config.database import Base



class FinancialReport(Base):

    __tablename__ = "financial_reports"



    id = Column(
        Integer,
        primary_key=True,
        index=True
    )



    report_type = Column(
        String(100),
        nullable=False
    )



    restaurant_id = Column(
        Integer,
        nullable=True
    )



    total_revenue = Column(
        Float,
        default=0
    )



    delivery_charges = Column(
        Float,
        default=0
    )



    refund_amount = Column(
        Float,
        default=0
    )



    wallet_amount = Column(
        Float,
        default=0
    )



    transaction_count = Column(
        Integer,
        default=0
    )



    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )