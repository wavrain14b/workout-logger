// JS for making graphs in statistics html

// FILLER DATA 
// NOTES: how data is stored for ref
// data -> key: date ("2025-11-28");
// [{ name: "Bench", 
// Sets: [{weight: 200, reps: 10}, {weight: 225, reps: 5}] }], ...
// 
const data = JSON.parse(localStorage.getItem("workouts")) || {};

let today = new Date(); 
let currentYear = today.getFullYear();
let currentMonth = today.getMonth(); 
let currentDay = today.getDate(); 

const liftInput = document.getElementById("workout-name-input");
const selectedLiftName = liftInput.value; 

if (Object.keys(data).length === 0) {
    const todayStr = getDateXDaysAgo(0);
    data[todayStr] = [
        { name: "Bench Press", sets: [{ weight: 225, reps: 10 }, { weight: 200, reps: 12 }] },
        { name: "Squat", sets: [{ weight: 315, reps: 5 }] }
    ];
    localStorage.setItem("workouts", JSON.stringify(data));
}

// chart elements
// const volumeCanvas = document.getElementById("volumeChart").getContext("2d");

const stats = {
    volumePerWeek: {},
    volumePerMonth: {},
    prs: {},
    totals: {},
    workoutFrequency: {},
    setsPerWeek: 0,
    setsPerMonth: 0,
    repsPerWeek: 0,
    repsPerMonth: 0,
    avgWorkoutLoad: {},
    est1RM: {}
};

// -----AVG VOLUME PER WEEK 
// Returns date string in the format "YYYY-MM-DD" for X days ago
function getDateXDaysAgo(x) {
    const date = new Date();
    date.setDate(date.getDate() - x);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

// Calculates total volume for a given date (sum of weight * reps)
function calculateVolumeForDay(date) {
    if (!data[date]) return 0; // no workouts for that date
    let totalVolume = 0;
    data[date].forEach(workout => {
        workout.sets.forEach(set => {
            totalVolume += set.weight * set.reps;
        });
    });
    return totalVolume;
}

function calculateVolumeForWorkout(liftName, date) {
    if (!data[date]) return 0; // no workouts on that date
    let totalVolume = 0;

    data[date].forEach(workout => { // each workout object in that date
        if (workout.name === liftName) {
            workout.sets.forEach(set => {
                totalVolume += set.weight * set.reps;
            });
        }
    });

    return totalVolume;
}

function estimatedOneRepMax(workoutName, date) {
    if (!data[date]) return 0;
    let max1RM = 0;

    data[date].forEach(workout => {
        if (workout.name === workoutName) {
            workout.sets.forEach(set => {
                const oneRM = set.weight * (1 + set.reps / 30); // Epley formula
                if (oneRM > max1RM) max1RM = oneRM;
            });
        }
    });

    return max1RM;
}

// ----------------- Compute daily volume -----------------
document.addEventListener("DOMContentLoaded", () => {
    const vol = document.getElementById("volumeChart").getContext("2d");
    let selectedLiftName = liftInput.value || "Bench Press";

// ------------------------VOLUME ---------------------------------
    // ---- WEEKLY DATA ----
    function getWeeklyVolume() {
        const dailyVolume = {};
        for (let i = 6; i >= 0; i--) {
            const dateStr = getDateXDaysAgo(i);
            dailyVolume[dateStr] = calculateVolumeForDay(dateStr);
        }
        return dailyVolume;
    }

    // ---- MONTHLY DATA ----
    function getMonthlyVolume() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1; // 1–12

        const daysInMonth = new Date(year, month, 0).getDate();

        const monthlyVolume = {};

        for (let day = 1; day <= daysInMonth; day++) {
            const dayStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            monthlyVolume[dayStr] = calculateVolumeForDay(dayStr);
        }
        return monthlyVolume;
    }

    // ---- INITIAL CHART (Weekly by default) ----
    let weeklyData = getWeeklyVolume();

    const volumeChart = new Chart(vol, {
        type: "line",
        data: {
            labels: Object.keys(weeklyData),
            datasets: [{
                label: "Volume",
                data: Object.values(weeklyData),
                borderColor: "blue",
                backgroundColor: "rgba(0,0,255,0.2)",
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: "Weekly Volume (Last 7 Days)"
                }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

// ------------------------PRS ---------------------------------
    

// ------------------------TOTALS ---------------------------------
    const totalsCh = document.getElementById("totalsChart").getContext("2d");

    function getWeeklyTotals(workoutName){
        const dailyVolume = {};
        for (let i = 6; i >= 0; i--) {
            const dateStr = getDateXDaysAgo(i);
            dailyVolume[dateStr] = calculateVolumeForWorkout(workoutName, dateStr);
        }
        return dailyVolume;
    }

    function getMonthlyTotals(workoutName){
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1; // 1–12

        const daysInMonth = new Date(year, month, 0).getDate();

        const monthlyVolume = {};

        for (let day = 1; day <= daysInMonth; day++) {
            const dayStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            monthlyVolume[dayStr] = calculateVolumeForWorkout(workoutName, dayStr);
        }
        return monthlyVolume;
    }

    let weeklyTotals = getWeeklyTotals(selectedLiftName); // default lift
    const disTotalsText = "Weekly Totals for " + selectedLiftName + " (Last 7 Days)";

    const totalsChart = new Chart(totalsCh, {
        type: "line",
        data: {
            labels: Object.keys(weeklyTotals),
            datasets: [{
                label: "1RM",
                data: Object.values(weeklyTotals),
                borderColor: "blue",
                backgroundColor: "rgba(0,0,255,0.2)",
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: disTotalsText
                }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

// ------------------------FREQUENCY ---------------------------------


// ------------------------SETS PER WEEK/MONTH ---------------------------------


// ------------------------REPS PER WEEK/MONTH ---------------------------------


// ------------------------AVERAGE WORKOUT LOAD ---------------------------------


// ------------------------EST 1RM ---------------------------------
// Epley formula 1RM = Weight * (1+(Reps/30))
// x-axis = date - y axis = estimated 1RM
    const oneRMCh = document.getElementById("oneRMChart").getContext("2d");

    function getOneRMWeekly(workoutName){
        const oneRM = {};
        for (let i = 6; i >= 0; i--) {
            const dateStr = getDateXDaysAgo(i);
            oneRM[dateStr] = estimatedOneRepMax(workoutName, dateStr);
        }
        return oneRM;
    }

    function getOneRMMonthly(workoutName){
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1; // 1–12

        const daysInMonth = new Date(year, month, 0).getDate();

        const monthlyOneRM = {};

        for (let day = 1; day <= daysInMonth; day++) {
            const dayStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            monthlyOneRM[dayStr] = estimatedOneRepMax(workoutName, dayStr);
        }
        return monthlyOneRM;
    }

    let oneRepMax = getOneRMWeekly(selectedLiftName); // default lift
    const disEstText = "Weekly 1RM estimates " + selectedLiftName + " (Last 7 Days)";

    const oneRMChart = new Chart(oneRMCh, {
        type: "line",
        data: {
            labels: Object.keys(oneRepMax),
            datasets: [{
                label: "One rep max estimate",
                data: Object.values(oneRepMax),
                borderColor: "blue",
                backgroundColor: "rgba(0,0,255,0.2)",
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: disEstText
                }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

// ---- BUTTON FUNCTIONALITY ----
    document.getElementById("weeklyBtn").addEventListener("click", () => {
        // volume data
        const volData = getWeeklyVolume();
        volumeChart.data.labels = Object.keys(volData);
        volumeChart.data.datasets[0].data = Object.values(volData);
        volumeChart.options.plugins.title.text = "Weekly Volume (Last 7 Days)";
        volumeChart.update();
        // totals data
        const tData = getWeeklyTotals(selectedLiftName);
        totalsChart.data.labels = Object.keys(tData);
        totalsChart.data.datasets[0].data = Object.values(tData);
        totalsChart.options.plugins.title.text = "Weekly Totals for " + selectedLiftName + " (Last 7 Days)";
        totalsChart.update();
        // 1RM data
        const oData = getOneRMWeekly(selectedLiftName);
        oneRMChart.data.labels = Object.keys(oData);
        oneRMChart.data.datasets[0].data = Object.values(oData);
        oneRMChart.options.plugins.title.text = "Weekly 1RM Estimation for " + selectedLiftName + " (Last 7 Days)";
        oneRMChart.update();
    });

    document.getElementById("monthlyBtn").addEventListener("click", () => {
        // volume data
        const volData = getMonthlyVolume();
        volumeChart.data.labels = Object.keys(volData);
        volumeChart.data.datasets[0].data = Object.values(volData);
        volumeChart.options.plugins.title.text = "Monthly Volume";
        volumeChart.update();
        // totals data
        const tData = getMonthlyTotals(selectedLiftName);
        totalsChart.data.labels = Object.keys(tData);
        totalsChart.data.datasets[0].data = Object.values(tData);
        totalsChart.options.plugins.title.text = "Monthly Totals for " + selectedLiftName;
        totalsChart.update();
        // 1RM data
        const oData = getOneRMMonthly(selectedLiftName);
        oneRMChart.data.labels = Object.keys(oData);
        oneRMChart.data.datasets[0].data = Object.values(oData);
        oneRMChart.options.plugins.title.text = "Monthly 1RM Estimation for " + selectedLiftName;
        oneRMChart.update();
    });


    // Changing lift by input
    liftInput.addEventListener("change", () => {
        const selectedLiftName = liftInput.value;

        // Update totals chart
        const tData = getWeeklyTotals(selectedLiftName);
        totalsChart.data.labels = Object.keys(tData);
        totalsChart.data.datasets[0].data = Object.values(tData);
        totalsChart.options.plugins.title.text = "Totals for " + selectedLiftName;
        totalsChart.update();

        // Update 1RM chart
        const oData = getOneRMWeekly(selectedLiftName);
        oneRMChart.data.labels = Object.keys(oData);
        oneRMChart.data.datasets[0].data = Object.values(oData);
        oneRMChart.options.plugins.title.text = "1RM estimate for " + selectedLiftName;
        oneRMChart.update();
    });

});