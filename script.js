// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getDatabase,ref, push} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
/*const firebaseConfig = {
  apiKey: "AIzaSyCI8nDeqzD24iq4ubJ17Jd9934y3agfsAo",
  authDomain: "meytics-dde93.firebaseapp.com",
  databaseURL: "https://meytics-dde93-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "meytics-dde93",
  storageBucket: "meytics-dde93.firebasestorage.app",
  messagingSenderId: "266828429829",
  appId: "1:266828429829:web:b0a912dadf468dd98e3a6c"
};

firebase.initializeApp(firebaseConfig);
const database=firebase.database();*/

/*let wasteChart; // Global variable to hold the chart instance

function loadChart() {
    database.ref("messData").once("value", (snapshot) => {
        const dates=[];
        const waste=[];
        snapshot.forEach(function(child){
    
            const data = child.val();
    
            dates.push(data.date);
            waste.push(data.waste);
    
        });
        createChart(dates,waste);
    });
}


function createChart(dates,waste){
    const ctx=document.getElementById('wasteChart').getContext('2d');
    new Chart(ctx,{
        type:"line",
        data: {
            labels: dates,
            datasets: [{
                label: "Food Waste",
                data: waste,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Waste Quantity'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                }
            }
        }
    })
 }

loadChart();*/

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const database=getDatabase(app);
console.log("script loaded");

//mess entry
const form = document.getElementById("wasteForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const prepared=parseFloat(document.getElementById("quantity").value);
    const students=Number(document.getElementById("people").value);
    const waste=parseFloat(document.getElementById("wasted").value);
    if (waste>prepared) {
        alert("Waste cannot be greater than prepared quantity!");
        return;
    }

    const data = {
        date: document.getElementById("date").value,
        dish: document.getElementById("dish").value,
        meal: document.getElementById("meal").value,
        prepared: prepared,
        students: students,
        waste: waste
    };

    console.log(prepared,waste,students);
    database.ref("messData").push(data)
    .then(() => console.log("Firebase write success"))
    .catch(err => console.log(err));

    alert("Data submitted successfully! Check console for details.");

    /*database.ref("messData").once("value", (snapshot) => {
        const dates=[];
        const waste=[];
        snapshot.forEach(function(child){

            const data = child.val();
    
            dates.push(data.date);
            waste.push(data.waste);
    
        });
        createChart(dates,waste);
    });
    function createChart(dates,waste){
        const ctx=document.getElementById('wasteChart').getContext('2d');
        new Chart(ctx,{
            type:"line",
            data: {
                labels: dates,
                datasets: [{
                    label: "Food Waste",
                    data: waste
                }]
            }
        })
     }*/



});

//student poll
const pollForm = document.getElementById("pollForm");

if(pollForm){

pollForm.addEventListener("submit", function(e){

e.preventDefault();

const rollno = document.getElementById("rollno").value;
const breakfast = document.getElementById("breakfast").value;
const lunch = document.getElementById("lunch").value;
const dinner = document.getElementById("dinner").value;

const data = {
    rollno: rollno,
    breakfast: breakfast,
    lunch: lunch,
    dinner: dinner
};

database.ref("studentPoll").push(data)
.then(()=> alert("Response submitted"))
.catch(err => console.log(err));

pollForm.reset();

});

}

