from fastapi import APIRouter, Depends
from app.models.schemas import BugReport, PredictionResponse
from app.services.predictor import get_model, predict_priority

router = APIRouter()

@router.post("/", response_model=PredictionResponse)
async def predict(report: BugReport):
    model = get_model()
    prediction = predict_priority(report, model)
    return {"priority": prediction}
