from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime
)

from sqlalchemy.sql import func

from app.config.database import Base



class Report(Base):

    __tablename__ = "reports"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    report_type = Column(
        String(100),
        nullable=False
    )


    title = Column(
        String(200),
        nullable=False
    )


    total_amount = Column(
        Float,
        default=0
    )


    total_count = Column(
        Integer,
        default=0
    )


    generated_by = Column(
        Integer,
        nullable=True
    )


    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )