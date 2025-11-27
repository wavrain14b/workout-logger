// workout UI js
// functions: setting the reps, sets, workout name and weight

// -- variables --
const params = new URLSearchParams(window.location.search);
const day = params.get("day");
const month = params.get("month");
const year = params.get("year");

const dateClickedDiv = document.querySelector(".workout-date-clicked");
const userInterfaceContainer = document.querySelector(".user-interface-container");

const addWorkoutBtn = document.querySelector(".add-workout-btn");
const workoutsContainer = document.querySelector(".individual-workouts-container");
addWorkoutBtn.addEventListener("click", addWorkout);

const date = getMonthName(month) + " " + day + " " + year;

// showing date on top 
dateClickedDiv.innerHTML = 
    `
    <div class = "display-date">
        <p> ${date} </p>
    </div>
    
    `
    ;

function addWorkout(){
    const newWorkout = document.createElement("div");
    newWorkout.classList.add("set");

    newWorkout.innerHTML = 
    `
        <div class="workout-item">
            <input class = "input-workout" list = "workouts" placeholder = "Enter workout name">
            <button class = "edit-workout-btn">✏️ Edit</button>
        </div>
    `;

    const editWorkoutBtn = newWorkout.querySelector(".edit-workout-btn");
    editWorkoutBtn.addEventListener("click", ()=>{
        const workoutName = newWorkout.querySelector(".input-workout").value;
        if (!workoutName) return alert("Enter a workout name first");

        window.location.href = `editWorkoutUI.html?name=${encodeURIComponent(workoutName)}&day=${day}&month=${month}&year=${year}`;
    });

    workoutsContainer.appendChild(newWorkout);
}

function getMonthName(month){
    const monthNumber = parseInt(month); // convert string to number
    const monthNames = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];
    return monthNames[monthNumber - 1]; // array is 0-based
}
