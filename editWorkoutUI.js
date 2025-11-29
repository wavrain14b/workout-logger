// --------------------------- VARIABLES ---------------------------
const params = new URLSearchParams(window.location.search);

const day = params.get("day");
const month = params.get("month");
const year = params.get("year");
const dateKey = `${year}-${month}-${day}`;

const workoutName = params.get("name");

const displayDate = document.querySelector(".date-display");
const userInterfaceContainer = document.querySelector(".edit-workout-container");

const addSetBtn = document.querySelector(".add-sets-btn");
const minusSetsBtn = document.querySelector(".minus-sets-btn");

addSetBtn.addEventListener("click", addSet);
minusSetsBtn.addEventListener("click", minusSet);

// --------------------------- LOAD STORAGE ---------------------------
let data = JSON.parse(localStorage.getItem("workouts")) || {};

if (!data[dateKey]) {
    data[dateKey] = [];
}

// Find the workout object we are editing
let workout = data[dateKey].find(w => w.name === workoutName);

// If not found, create one (rare case)
if (!workout) {
    workout = { name: workoutName, sets: [] };
    data[dateKey].push(workout);
    save();
}

// --------------------------- DISPLAY DATE ---------------------------
const dateDisplay = `${getMonthName(month)} ${day} ${year}`;
displayDate.innerHTML = `
    <div class="display-date">
        <p>${dateDisplay}</p>
    </div>
`;

// --------------------------- LOAD EXISTING SETS ---------------------------
workout.sets.forEach(set => {
    addSetUI(set.weight, set.reps);
});

// --------------------------- FUNCTIONS ---------------------------

// Add set (button click)
function addSet() {
    addSetUI("", ""); // blank set
    save();
}

// Create & display set UI
function addSetUI(weightVal, repsVal) {
    const newSet = document.createElement("div");
    newSet.classList.add("set");

    newSet.innerHTML = `
        <input class="weight" placeholder="Weight" value="${weightVal}">
        <input class="reps" placeholder="Reps" value="${repsVal}">
    `;

    // Save whenever the user types
    newSet.querySelector(".weight").addEventListener("input", save);
    newSet.querySelector(".reps").addEventListener("input", save);

    userInterfaceContainer.appendChild(newSet);
}

// Remove last set
function minusSet() {
    const sets = document.querySelectorAll(".set");
    if (sets.length > 0) {
        sets[sets.length - 1].remove();
        save();
    }
}

// Save updated sets into localStorage
function save() {
    const setDivs = document.querySelectorAll(".set");

    workout.sets = []; // reset sets array

    setDivs.forEach(div => {
        const weight = div.querySelector(".weight").value;
        const reps = div.querySelector(".reps").value;

        if (weight || reps) {
            workout.sets.push({
                weight,
                reps
            });
        }
    });

    localStorage.setItem("workouts", JSON.stringify(data));
}

// Convert month number to name
function getMonthName(month) {
    return [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ][parseInt(month) - 1];
}
