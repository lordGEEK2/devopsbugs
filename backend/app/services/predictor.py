import joblib
from app.models.schemas import BugReport
from app.utils.preprocessing import preprocess_input
import os

_model = None

def get_model():
    global _model
    if _model is None:
        model_path = os.getenv("MODEL_PATH", "app/data/model.pkl")
        _model = joblib.load(model_path)
    return _model

def predict_priority(report: BugReport, model):
    features = preprocess_input(report)
    prediction = model.predict([features])[0]
    return prediction
