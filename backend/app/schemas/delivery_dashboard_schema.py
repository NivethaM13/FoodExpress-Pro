from pydantic import BaseModel


class DeliveryDashboardResponse(BaseModel):

    assigned_deliveries:int

    completed_deliveries:int

    total_earnings:float

    delivery_rating:float

    route_suggestions:list