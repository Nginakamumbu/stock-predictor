import yfinance as yf
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import matplotlib.pyplot as plt
import seaborn as sns

# 1. Ask user to enter ticker (stock or forex)
print("Examples:")
print("  AAPL (Apple stock)")
print("  TSLA (Tesla stock)")
print("  EURUSD=X (EUR/USD Forex)")
print("  BTC-USD (Bitcoin)\n")

ticker = input("Enter asset ticker symbol: ").upper().strip()

# 2. Download historical data
df = yf.download(ticker, start="2022-01-01", end="2024-12-31")

if df.empty:
    print("Failed to fetch data. Try a different ticker.")
    exit()

# 3. Create Target
df['Tomorrow'] = df['Close'].shift(-1)
df['Target'] = (df['Tomorrow'] > df['Close']).astype(int)

# 4. Create features (can customize more later)
df['MA3'] = df['Close'].rolling(3).mean()
df['MA7'] = df['Close'].rolling(7).mean()
df.dropna(inplace=True)

# 5. Prepare training data
features = ['Open', 'High', 'Low', 'Close', 'Volume', 'MA3', 'MA7']
X = df[features]
y = df['Target']

# 6. Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, shuffle=False)

# 7. Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 8. Predict
y_pred = model.predict(X_test)

# 9. Evaluation
print("\n=== MODEL EVALUATION ===")
print("Accuracy:", round(accuracy_score(y_test, y_pred), 3))
print("\nClassification Report:\n", classification_report(y_test, y_pred))

# 10. Confusion Matrix
plt.figure(figsize=(5, 4))
sns.heatmap(pd.crosstab(y_test, y_pred), annot=True, fmt='d', cmap='Greens')
plt.title(f"{ticker} Movement Prediction")
plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.tight_layout()
plt.show()
