# Messlytics
Smart Mess Management System — Food Waste Analytics and NGO Coordination Platform

## Overview
Messlytics is a web-based platform designed to help institutional kitchens, such as college mess facilities, monitor food preparation, track food waste, and coordinate surplus food distribution with NGOs.

The system integrates data entry, analytics dashboards, machine learning–based demand prediction, student participation, and NGO alerts into a single platform. The goal is to reduce food waste, improve planning accuracy, and enable efficient redistribution of excess food.

## Features

### Mess Entry System
Kitchen staff can record daily food preparation quantities and leftover food for different meals. This data helps track operational patterns and identify inefficiencies in food production.

### Analytics Dashboard
The dashboard visualizes food preparation and waste trends using interactive charts. It provides insights across dates and meals, allowing administrators to monitor waste levels and improve planning.

### Student Meal Poll
Students can indicate whether they plan to attend specific meals the following day. This feedback provides early signals of expected attendance and helps improve demand estimation.

### Machine Learning Food Demand Prediction
An AI-powered module analyzes historical mess data and student poll responses to estimate expected food demand. These predictions help kitchen staff prepare accurate quantities and reduce excess food production.

### NGO Alert System
When surplus food exceeds a defined threshold, the system generates alerts for registered NGOs so they can arrange pickup and distribute the food before it goes to waste.

## Food Waste Prediction Using Mess Data (Machine Learning)

### Objective
- Analyze mess food preparation and waste patterns  
- Build a machine learning model to predict food waste  
- Provide insights that help optimize food preparation  

### Dataset Description
The dataset includes:

- **date** — Day of record  
- **prepared_food** — Quantity of food prepared  
- **students** — Number of students present  
- **wasted_food** — Quantity of food wasted  

### Model Description
A regression model is trained on historical data to learn the relationship between food prepared, student attendance, and food waste. The trained model estimates future food waste based on new inputs.

### Model Performance
The trained model achieved an **R² score of around 0.76**, indicating reasonably good predictive performance.

### How to Run

Install required libraries:
pip install pandas numpy scikit-learn


### Future Improvements
 -Use a larger dataset collected over longer periods  
 -Add features such as meal type or day of the week  
 -Integrate predictions with the web dashboard for visualization  

## Technology Stack

### Frontend
-HTML  
-CSS  
-JavaScript  

### Data and Backend
-Firebase Realtime Database  

### Data Visualization
-Chart.js  

### Machine Learning
-Python-based AI module for food demand prediction  
