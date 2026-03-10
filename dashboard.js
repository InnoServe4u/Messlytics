database.ref("messData").once("value", function(snapshot){


    const dates = []
    const students = []
    const prepared = []
    const waste = []
    const meals = []
    
    
    snapshot.forEach(function(child){
    
    const data = child.val()
    
    dates.push(data.date + " " + data.meal)
    students.push(data.students)
    prepared.push(Number(data.prepared))
    waste.push(Number(data.waste))
    
    
    })
    
    createAttendanceChart(dates, students)
    createComparisonChart(dates,prepared, waste)
    createWasteChart(dates, waste)
    createPredictionChart(predDates,predFood)
    
    })

function createAttendanceChart(dates, students){

    new Chart(document.getElementById("attendanceChart"),{


        type:"line",

        data:{
            labels:dates,

        datasets:[{
            label:"Number of Students",
            data:students
        }]
    }
    });
}


function createComparisonChart(dates,prepared, waste){

    new Chart(document.getElementById("comparisonChart"),{

    
        type:"bar",
    
        data:{
            labels:dates,
    
            datasets:[

    
                {

                label:"Food Prepared",
                data:prepared
                },
    
                {
                label:"Food Waste",
                data:waste
                }

    
            ]       
    
        },
        options: {
            responsive:true,
            scales:{
                x:{
                    title:{display:true,
                        text:"Date"
                    },
                y:{
                    beginAtZero: true,
                    title: {
                        display:true,
                        text:"Food Quantity"
                    }
                }
                }
            }
        }
    
    })
}

function createWasteChart(dates, waste){

    new Chart(document.getElementById("wasteChart"),{
        
        type:"line",
        
        data:{
            labels:dates,
        
            datasets:[{
                label:"Food Waste",
                data:waste
                }]
        }
        
    })
        
}

database.ref("ai_result").on("value", function(snapshot){

    const data = snapshot.val()

    const students = data.predicted_students
    const food = data.recommended_food
    const waste = data.waste_percent
    const accuracy = data.model_accuracy * 100

    document.getElementById("predStudents").innerText = students
    document.getElementById("predFood").innerText = food + " kg"
    document.getElementById("predWaste").innerText = waste + " %"
    document.getElementById("predAccuracy").innerText = accuracy.toFixed(1) + "%"

    document.getElementById("accuracyFill").style.width = accuracy + "%"

    // Waste risk color
    const card = document.querySelector(".prediction-card")

    if(waste < 10){
        card.style.borderLeft = "6px solid green"
    }
    else if(waste < 20){
        card.style.borderLeft = "6px solid orange"
    }
    else{
        card.style.borderLeft = "6px solid red"
    }

    const suggestion = document.getElementById("aiSuggestion")

    if(waste < 10){
        suggestion.innerText = "Food preparation level is optimal."
    }
    else if(waste < 20){
        suggestion.innerText = "Consider reducing food preparation slightly."
    }
    else{
        suggestion.innerText = "High waste expected. Reduce preparation by about 10–15%."
    }


})




    
        
     


    
    