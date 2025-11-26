// workout UI js
// functions: setting the reps, sets, workout name and weight

// -- variables --
const params = new URLSearchParams(window.location.search);
const day = params.get("day");
const month = params.get("month");
const year = params.get("year");

const dateClickedDiv = document.querySelector(".workout-date-clicked");
const displayWorkoutsDiv = document.querySelector(".display-workouts");


// showing date on top 
dateClickedDiv.innerHTML = 
    '<h1> ${day} </h1>'
    ;

// setting display html
displayWorkoutsDiv.innerHTML = 
    ""
    ;