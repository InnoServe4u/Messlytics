database.ref("ngo_alert").on("value", function(snapshot){

    const data = snapshot.val()
    
    document.getElementById("foodAvailable").innerText = data.food_available
    document.getElementById("mealType").innerText = data.meal
    document.getElementById("foodLocation").innerText = data.location
    document.getElementById("pickupStatus").innerText = data.pickup_status
    
    })
    document.getElementById("pickupBtn").addEventListener("click", function(){

        database.ref("ngo_alert").update({
        
        pickup_status: "collected"
        
        })
        
        })
        
    