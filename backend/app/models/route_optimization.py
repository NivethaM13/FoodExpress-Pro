from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.config.database import Base



class RouteOptimization(Base):

    __tablename__ = "route_optimizations"


    id = Column(
        Integer,
        primary_key=True,
        index=True
    )


    delivery_assignment_id = Column(
        Integer,
        ForeignKey("delivery_assignments.id"),
        nullable=False
    )


    start_location = Column(
        String(255),
        nullable=False
    )


    end_location = Column(
        String(255),
        nullable=False
    )


    total_distance_km = Column(
        Float,
        nullable=True
    )


    estimated_time = Column(
        Integer,
        nullable=True
    )


    traffic_status = Column(
        String(50),
        default="NORMAL"
    )


    route_status = Column(
        String(50),
        default="OPTIMIZED"
    )


    created_at = Column(
        DateTime,
        server_default=func.now()
    )