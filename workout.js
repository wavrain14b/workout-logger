// workout UI js 
// Page 3: Shows workouts for a selected date and allows adding/removing them.

// ---------------- VARIABLES ----------------
const params = new URLSearchParams(window.location.search);
let day = params.get("day");
let month = params.get("month");
let year = params.get("year");

// If no day/month/year provided, default to today
if (!day || !month || !year) {
    const today = new Date();
    const todayDay = today.getDate();
    const todayMonth = today.getMonth() + 1; 
    const todayYear = today.getFullYear();

    // Redirect WITH correct params
    window.location.href = `workout.html?day=${todayDay}&month=${todayMonth}&year=${todayYear}`;
}

const dateKey = `${year}-${month}-${day}`;

const dateClickedDiv = document.querySelector(".workout-date-clicked");
const workoutsContainer = document.querySelector(".individual-workouts-container");

const addWorkoutBtn = document.querySelector(".add-workout-btn");
const minusWorkoutBtn = document.querySelector(".minus-workout-btn");

addWorkoutBtn.addEventListener("click", addWorkout);
minusWorkoutBtn.addEventListener("click", minusWorkout);

// ---------- Display date at top ----------
const dateText = getMonthName(month) + " " + day + " " + year;

dateClickedDiv.innerHTML = `
    <div class="display-date">
        <p>${dateText}</p>
    </div>
`;

// ---------------- LOAD DATA ----------------
let data = JSON.parse(localStorage.getItem("workouts")) || {};

// Make sure date exists in saved structure
if (!data[dateKey]) {
    data[dateKey] = []; 
}

// Load and display all existing workouts
data[dateKey].forEach(workout => {
    addWorkoutUI(workout.name);
});

// ---------------- FUNCTIONS ----------------
// Button-click version (makes empty workout)
function addWorkout() {
    addWorkoutUI(""); // blank workout name for user to type
    saveToLocalStorage();
}

// Creates the display HTML for a workout
function addWorkoutUI(name) {
    const newWorkout = document.createElement("div");
    newWorkout.classList.add("workout-item");

    newWorkout.innerHTML = `
        <input class="input-workout" list="workouts" placeholder="Enter workout name" value="${name}">
        <button class="edit-workout-btn">✏️ Edit</button>
    `;

    const editBtn = newWorkout.querySelector(".edit-workout-btn");
    editBtn.addEventListener("click", () => {
        const workoutName = newWorkout.querySelector(".input-workout").value.trim();

        if (!workoutName) return alert("Enter a workout name first");

        // Go to sets/reps editing page
        window.location.href = `editWorkoutUI.html?name=${encodeURIComponent(workoutName)}&day=${day}&month=${month}&year=${year}`;
    });

    // Save any time the user types
    newWorkout.querySelector(".input-workout").addEventListener("input", saveToLocalStorage);

    workoutsContainer.appendChild(newWorkout);
}

// Remove last workout
function minusWorkout() {
    const items = document.querySelectorAll(".workout-item");

    if (items.length > 0) {
        items[items.length - 1].remove();
        saveToLocalStorage();
    }
}

// Save current workouts to localStorage
function saveToLocalStorage() {
    const items = document.querySelectorAll(".workout-item");

    data[dateKey] = [];

    items.forEach(item => {
        const name = item.querySelector(".input-workout").value.trim();

        if (name) {
            data[dateKey].push({
                name,
                sets: [] // sets edited on Page 4
            });
        }
    });

    localStorage.setItem("workouts", JSON.stringify(data));
}

function getMonthName(month) {
    const monthNumber = parseInt(month);
    const monthNames = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];
    return monthNames[monthNumber - 1];
}
