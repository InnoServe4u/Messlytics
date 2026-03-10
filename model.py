import firebase_admin
import base64
from firebase_admin import credentials, db

cred = credentials.Certificate("serviceAccountKey.json")

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://meytics-dde93-default-rtdb.asia-southeast1.firebasedatabase.app/'
})
#NGO contact list
ngo_list=[
    {
        "id":"hope_of_life",
        "name":"HOPE OF LIFE",
        "phone":"demo"
    },
    {
        "id":"helping_hands_vedvyas",
        "name":"HELPING HANDS VEDVYAS",
        "phone":"demo"
    },
    {
        "id":"sos_rourkela",
        "name":"SOS Children's Village Rourkela",
        "phone":"demo"
    },
]
import pandas as pd
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt
ref=db.reference("messData")
firebase_data = ref.get()
if firebase_data is None:
    print("No data found in Firebase")
    exit()
data = pd.DataFrame.from_dict(firebase_data,orient="index")
data['date']=pd.to_datetime(data['date'])
data=data.sort_values(by="date")
data["date_meal"]=data["date"].astype(str)+ "-" + data["meal"]
print(data.head())
data["students_movingavg"]=data.groupby("meal")["students"].rolling(3).mean().reset_index(level=0,drop=True)
data=data.dropna()
print(data)
X= data[['prepared','waste','students_movingavg']]
Y=data['students']
model=LinearRegression()
model.fit(X,Y)
plt.style.use("ggplot")
plt.figure(figsize=(10,5))

plt.plot(data['date_meal'], data['students'], marker='o', label="Actual Students")
plt.plot(data['date_meal'], data['students_movingavg'], marker='s', label="Moving Average")

plt.xlabel("Date and Meal")
plt.ylabel("Number of Students")
plt.title("Mess Attendance Trend")

plt.xticks(rotation=45, ha="right")
plt.grid(True)

plt.legend()
plt.tight_layout()

plt.savefig("attendance_graph.png")
plt.clf()
data["waste_percent"]=data["waste"]/data["prepared"]
print(data)
avg_waste= data["waste_percent"].mean()
print("Average waste percentage:",avg_waste*100)
waste_percent_value = avg_waste * 100

print("Average waste percentage:", round(waste_percent_value,2), "%")

print("AI Suggestion:")
print("Reduce food preparation by about", round(waste_percent_value,2), "% tomorrow")
print("based on historical waste patterns.")
if waste_percent_value>20:
    print("⚠️ ALERT: High food waste detected in the mess!")
latest_entry = data.iloc[-1]

tomorrow_food = float(latest_entry["prepared"])
future_prepared = float(latest_entry["prepared"])
future_waste = float(latest_entry["waste"])
recommended_food= tomorrow_food*(1-avg_waste)
print("Recommended food preparation:",round(recommended_food,2),"kg")
remaining_food=tomorrow_food-recommended_food
print("Estimated leftover food:",round(remaining_food,2),"kg")
from datetime import datetime
def send_ngo_alert(food_amount):

    ngos_status = {}

    for ngo in ngo_list:
        ngos_status[ngo["id"]] = {
            "name": ngo["name"],
            "notified": True,
            "accepted": False,
            "message":"Food available for pickup."
        }

    alert_data = {
        "food_available": round(food_amount,2),
        "location": "University Mess",
        "meal": latest_entry["meal"],
        "status": "waiting_for_pickup",
        "created_time":datetime.now().timestamp(),
        "pickup_deadline_hours":2,
        "ngos": ngos_status
    }

    db.reference("ngo_alert").set(alert_data)

    print("\nNGO alert created with timer")

    for ngo in ngo_list:
        print("Message sent to:", ngo["name"])
        print("pickup_location:University mess")
        print("Food available:", round(food_amount,2), "kg")
        print("-------------------")
if remaining_food>5:
    send_ngo_alert(remaining_food)
plt.figure(figsize=(10,5))

plt.plot(data['date_meal'], data['waste'], marker='o')

plt.xlabel("Date and Meal")
plt.ylabel("Food Waste (kg)")
plt.title("Food Waste Trend")

plt.xticks(rotation=45, ha="right")
plt.grid(True)

plt.tight_layout()

plt.savefig("waste_graph.png")
plt.clf()
plt.figure(figsize=(10,5))

plt.plot(data['date_meal'], data['prepared'], marker='o', label="Food Prepared")
plt.plot(data['date_meal'], data['waste'], marker='x', label="Food Wasted")

plt.xlabel("Date and Meal")
plt.ylabel("Food Quantity (kg)")
plt.title("Prepared Food vs Wasted Food")

plt.xticks(rotation=45, ha="right")
plt.grid(True)

plt.legend()
plt.tight_layout()

plt.savefig("comparison_graph.png")
plt.clf()
def image_to_base64(path):
    with open(path, "rb") as img:
        return base64.b64encode(img.read()).decode()

attendance_img = image_to_base64("attendance_graph.png")
waste_img = image_to_base64("waste_graph.png")
comparison_img = image_to_base64("comparison_graph.png")

db.reference("graphs").set({
    "attendance": attendance_img,
    "waste": waste_img,
    "comparison": comparison_img
})

print("Graphs uploaded to Firebase successfully")
score=model.score(X,Y)
print("Model accuracy(R² score):",round(score,3))
 
future_input = pd.DataFrame({
    'prepared': [future_prepared],
    'waste': [future_waste],
    'students_movingavg':[latest_entry["students_movingavg"]]
})
future_prediction = model.predict(future_input)
print("Forecasted students tomorrow:", int(future_prediction[0]))
print("\nMeal-wise student prediction:")

for meal in data["meal"].unique():
    meal_data = data[data["meal"] == meal]
    
    X_meal = meal_data[['prepared','waste','students_movingavg']]
    Y_meal = meal_data['students']
    
    meal_model = LinearRegression()
    meal_model.fit(X_meal, Y_meal)

    latest_meal = meal_data.iloc[-1]
    
    future_input = pd.DataFrame({
        'prepared': [latest_meal["prepared"]],
        'waste': [latest_meal["waste"]],
        'students_movingavg':[latest_meal["students_movingavg"]]
    })

    pred = meal_model.predict(future_input)

    print(meal.capitalize(), "predicted students:", int(pred[0]))
db.reference("ai_result").set({
    "waste_percent": round(waste_percent_value,2),
    "recommended_food": round(recommended_food,2),
    "model_accuracy": round(score,3),
    "predicted_students":int(future_prediction[0])
})
print("AI results successfully updated to Firebase.")
