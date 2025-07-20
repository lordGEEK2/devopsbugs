from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.predict import router as predict_router
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(
    title="DevOps Bug Prioritizer",
    description="API to predict bug priority using an ML model",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict_router, prefix="/predict")
