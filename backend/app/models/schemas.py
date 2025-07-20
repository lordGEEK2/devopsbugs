from pydantic import BaseModel

class BugReport(BaseModel):
    title: str
    description: str
    module: str
    frequency: str
    user_type: str
    logs: str

class PredictionResponse(BaseModel):
    priority: str
