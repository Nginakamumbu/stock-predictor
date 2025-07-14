from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import yfinance as yf
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

app = FastAPI()

# Allow frontend to access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend URL later
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request model
class PredictionRequest(BaseModel):
    ticker: str

@app.get("/")
def home():
    return {"message": "Stock Predictor API is working"}

@app.post("/predict")
def predict_price(req: PredictionRequest):
    ticker = req.ticker.upper().strip()
    
    df = yf.download(ticker, start="2022-01-01", end="2024-12-31")
    if df.empty:
        return {"error": "Failed to fetch data. Try a different ticker."}

    # Create target
    df['Tomorrow'] = df['Close'].shift(-1)
    df['Target'] = (df['Tomorrow'] > df['Close']).astype(int)
    df['MA3'] = df['Close'].rolling(3).mean()
    df['MA7'] = df['Close'].rolling(7).mean()
    df.dropna(inplace=True)

    features = ['Open', 'High', 'Low', 'Close', 'Volume', 'MA3', 'MA7']
    X = df[features]
    y = df['Target']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False)
    
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    # Get most recent prediction
    latest_features = X.iloc[-1].values.reshape(1, -1)
    predicted_movement = model.predict(latest_features)[0]
    confidence = model.predict_proba(latest_features)[0][predicted_movement] * 100

    actual_close = df.iloc[-1]["Close"]
    next_close = df.iloc[-1]["Tomorrow"]
    change = round(next_close - actual_close, 2)
    change_percent = round((change / actual_close) * 100, 2)

    return {
        "symbol": ticker,
        "currentPrice": round(actual_close, 2),
        "predictedPrice": round(next_close, 2),
        "change": change,
        "changePercent": change_percent,
        "confidence": int(confidence),
        "trend": "up" if change > 0 else "down",
        "category": "forex" if "/" in ticker or "=X" in ticker else "tech"
    }
