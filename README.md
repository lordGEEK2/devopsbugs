# 🐞 DevOps Bug Prioritizer

An AI-powered DevOps tool that automates bug prioritization using machine learning. It classifies software issues into Low, Medium, High, or Critical based on metadata like module, frequency, logs, user type, and descriptions—helping engineering teams focus on the most impactful problems first.

---

## 🚀 Demo

> _Live Demo: Coming soon_  
> _Backend Endpoint: `http://localhost:8000/predict`_  
> _Frontend UI: `http://localhost:3000`_

---

## 📌 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [API Usage](#-api-usage)
- [Model Training](#-model-training)
- [Screenshots](#-screenshots)
- [Folder Structure](#-folder-structure)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- 🧠 Predicts bug priority using an ML model (RandomForest)
- 🧾 Submit bug reports via a clean web UI
- 🧩 View prioritized bug list in a table
- 🔍 Filter/sort bugs by severity or module
- 🧰 FastAPI backend for real-time predictions
- 🌐 React + Tailwind frontend for UX
- 🐳 Dockerized and ready for CI/CD

---

## 🛠️ Tech Stack

**Frontend:** React, Tailwind CSS, Axios  
**Backend:** FastAPI, Pydantic, Uvicorn  
**Machine Learning:** Scikit-learn, Pandas, joblib  
**DevOps:** Docker, Docker Compose  
**Testing:** Pytest, React Testing Library

---

## Architecture
User → React Frontend → FastAPI Backend → ML Model (.pkl) → Priority Output
