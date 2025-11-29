// calendar 

// --- variables ---
// 
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

//--- dates ---
let today = new Date(); 
let currentYear = today.getFullYear();
let currentMonth = today.getMonth(); 
let currentDay = today.getDate(); 

let startDay = new Date(currentYear, currentMonth, 1).getDay(); // NOTE: 0-6 = sun-sat
let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

const calendar = document.querySelector(".calendar");
const monthDisplay = document.querySelector(".month-name");

//-- buttons --

const nextMonthBtn = document.querySelector(".next-month-btn");
const prevMonthBtn = document.querySelector(".prev-month-btn");

nextMonthBtn.addEventListener("click", ()=>{
    currentMonth+=1;

    // handle year rollover
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear += 1;
    }

    buildCalendar();
});

prevMonthBtn.addEventListener("click", ()=>{
    currentMonth-=1;

    // handle year rollover
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear -= 1;
    }

    buildCalendar();
});

// --- functionality ---

// build array 
const calendarCells = [];

// empty cells
for (let i = 0; i < startDay; i++) {
    calendarCells.push(null);
}
// day numbers
for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(day);
}

// initialize/build calendar
monthDisplay.innerHTML = monthNames[currentMonth] + " " + currentYear;
calendar.innerHTML = "";

calendarCells.forEach(day => {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    if (day !== null) {
        cell.textContent = day;
    }

    calendar.appendChild(cell);

    cell.addEventListener("click", () => {
        if(day ==null){
            alert("You can't do that buddy!");
        }else{
            // navigate to new page
            window.location.href = `workout.html?day=${day}&month=${currentMonth + 1}&year=${currentYear}`;
        }
    });
});

// check this logic later
function buildCalendar() {
    const startDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const calendarCells = [];

    for (let i = 0; i < startDay; i++) calendarCells.push(null);
    for (let day = 1; day <= daysInMonth; day++) calendarCells.push(day);

    monthDisplay.innerHTML = monthNames[currentMonth] + " " + currentYear;
    calendar.innerHTML = "";

    calendarCells.forEach(day => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        if (day !== null) cell.textContent = day;

        calendar.appendChild(cell);

        cell.addEventListener("click", () => {
            window.location.href = `workout.html?day=${day}&month=${currentMonth + 1}&year=${currentYear}`;
        });
    });
}

