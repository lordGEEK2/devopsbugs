from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_prediction():
    payload = {
        "title": "Crash on load",
        "description": "Fails on initial boot",
        "module": "Loader",
        "frequency": "Frequent",
        "user_type": "User",
        "logs": "Segmentation fault"
    }
    response = client.post("/predict/", json=payload)
    assert response.status_code == 200
    assert response.json()["priority"] in ["Low", "Medium", "High", "Critical"]
