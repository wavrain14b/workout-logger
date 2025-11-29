// JS for making graphs in statistics html

// FILLER DATA 
const data = {
  "2025-09-29": [
    { name: "Bench Press", sets: [{weight: 225, reps: 6}, {weight: 245, reps: 4}, {weight: 265, reps: 2}] },
    { name: "Pull Ups", sets: [{weight: 0, reps: 10}, {weight: 0, reps: 8}] }
  ],
  "2025-09-30": [
    { name: "Squat", sets: [{weight: 275, reps: 5}, {weight: 295, reps: 3}] },
    { name: "Lunges", sets: [{weight: 50, reps: 10}, {weight: 50, reps: 10}] }
  ],
  "2025-10-01": [
    { name: "OHP", sets: [{weight: 115, reps: 5}, {weight: 125, reps: 3}] },
    { name: "Bench Press", sets: [{weight: 205, reps: 8}, {weight: 225, reps: 5}] }
  ],
  "2025-10-02": [
    { name: "Deadlift", sets: [{weight: 365, reps: 3}, {weight: 405, reps: 2}] }
  ],
  "2025-10-03": [
    { name: "Bench Press", sets: [{weight: 245, reps: 5}, {weight: 265, reps: 3}] },
    { name: "Rows", sets: [{weight: 185, reps: 8}, {weight: 185, reps: 8}] }
  ],
  "2025-10-04": [
    { name: "Pull Ups", sets: [{weight: 25, reps: 5}, {weight: 25, reps: 4}] },
    { name: "Curls", sets: [{weight: 35, reps: 10}] }
  ],
  "2025-10-05": [
    { name: "Squat", sets: [{weight: 285, reps: 4}, {weight: 305, reps: 2}] }
  ],
  "2025-10-06": [
    { name: "Bench Press", sets: [{weight: 225, reps: 8}, {weight: 245, reps: 5}] }
  ],
  "2025-10-07": [
    { name: "Deadlift", sets: [{weight: 385, reps: 3}, {weight: 425, reps: 2}] }
  ],
  "2025-10-08": [
    { name: "OHP", sets: [{weight: 115, reps: 6}, {weight: 135, reps: 2}] }
  ],
  "2025-10-09": [
    { name: "Bench Press", sets: [{weight: 255, reps: 3}, {weight: 275, reps: 1}] }
  ],
  "2025-10-10": [
    { name: "Rows", sets: [{weight: 195, reps: 8}, {weight: 195, reps: 8}] },
    { name: "Pull Ups", sets: [{weight: 0, reps: 12}] }
  ],
  "2025-10-11": [
    { name: "Squat", sets: [{weight: 275, reps: 6}, {weight: 295, reps: 4}] }
  ],
  "2025-10-12": [
    { name: "Bench Press", sets: [{weight: 225, reps: 10}, {weight: 245, reps: 6}] }
  ],
  "2025-10-13": [
    { name: "Deadlift", sets: [{weight: 395, reps: 3}, {weight: 415, reps: 2}] }
  ],
  "2025-10-14": [
    { name: "OHP", sets: [{weight: 125, reps: 5}, {weight: 135, reps: 3}] }
  ],
  "2025-10-15": [
    { name: "Bench Press", sets: [{weight: 260, reps: 3}, {weight: 275, reps: 2}] }
  ],
  "2025-10-16": [
    { name: "Pull Ups", sets: [{weight: 35, reps: 4}, {weight: 35, reps: 3}] }
  ],
  "2025-10-17": [
    { name: "Squat", sets: [{weight: 295, reps: 4}, {weight: 315, reps: 2}] }
  ],
  "2025-10-18": [
    { name: "Bench Press", sets: [{weight: 235, reps: 8}, {weight: 255, reps: 5}] }
  ],
  "2025-10-19": [
    { name: "Deadlift", sets: [{weight: 405, reps: 3}, {weight: 435, reps: 1}] }
  ],
  "2025-10-20": [
    { name: "OHP", sets: [{weight: 115, reps: 7}, {weight: 125, reps: 4}] }
  ],
  "2025-10-21": [
    { name: "Bench Press", sets: [{weight: 250, reps: 4}, {weight: 270, reps: 2}] }
  ],
  "2025-10-22": [
    { name: "Pull Ups", sets: [{weight: 0, reps: 12}, {weight: 0, reps: 10}] }
  ],
  "2025-10-23": [
    { name: "Squat", sets: [{weight: 285, reps: 5}, {weight: 305, reps: 3}] }
  ],
  "2025-10-24": [
    { name: "Bench Press", sets: [{weight: 240, reps: 6}, {weight: 260, reps: 4}] }
  ],
  "2025-10-25": [
    { name: "Deadlift", sets: [{weight: 395, reps: 3}, {weight: 415, reps: 2}] }
  ],
  "2025-10-26": [
    { name: "OHP", sets: [{weight: 120, reps: 6}, {weight: 135, reps: 2}] }
  ],
  "2025-10-27": [
    { name: "Bench Press", sets: [{weight: 255, reps: 3}, {weight: 275, reps: 1}] }
  ],
  "2025-10-28": [
    { name: "Pull Ups", sets: [{weight: 25, reps: 5}, {weight: 25, reps: 4}] }
  ],
  "2025-10-29": [
    { name: "Squat", sets: [{weight: 295, reps: 4}, {weight: 315, reps: 2}] }
  ],
  "2025-10-30": [
    { name: "Bench Press", sets: [{weight: 245, reps: 5}, {weight: 265, reps: 3}] }
  ],
  "2025-10-31": [
    { name: "Deadlift", sets: [{weight: 405, reps: 2}, {weight: 425, reps: 1}] }
  ],
  "2025-11-01": [
    { name: "OHP", sets: [{weight: 115, reps: 7}, {weight: 125, reps: 4}] }
  ],
  "2025-11-02": [
    { name: "Bench Press", sets: [{weight: 225, reps: 10}, {weight: 245, reps: 6}] }
  ],
  "2025-11-03": [
    { name: "Pull Ups", sets: [{weight: 0, reps: 12}, {weight: 0, reps: 10}] }
  ],
  "2025-11-04": [
    { name: "Squat", sets: [{weight: 285, reps: 5}, {weight: 305, reps: 3}] }
  ],
  "2025-11-05": [
    { name: "Bench Press", sets: [{weight: 240, reps: 6}, {weight: 260, reps: 4}] }
  ],
  "2025-11-06": [
    { name: "Deadlift", sets: [{weight: 395, reps: 3}, {weight: 415, reps: 2}] }
  ],
  "2025-11-07": [
    { name: "OHP", sets: [{weight: 115, reps: 6}, {weight: 130, reps: 3}] }
  ],
  "2025-11-08": [
    { name: "Bench Press", sets: [{weight: 250, reps: 4}, {weight: 270, reps: 2}] }
  ],
  "2025-11-09": [
    { name: "Pull Ups", sets: [{weight: 35, reps: 4}, {weight: 25, reps: 5}] }
  ],
  "2025-11-10": [
    { name: "Squat", sets: [{weight: 295, reps: 4}, {weight: 315, reps: 2}] }
  ],
  "2025-11-11": [
    { name: "Bench Press", sets: [{weight: 235, reps: 8}, {weight: 255, reps: 5}] }
  ],
  "2025-11-12": [
    { name: "Deadlift", sets: [{weight: 405, reps: 2}, {weight: 425, reps: 1}] }
  ],
  "2025-11-13": [
    { name: "OHP", sets: [{weight: 125, reps: 5}, {weight: 135, reps: 2}] }
  ],
  "2025-11-14": [
    { name: "Bench Press", sets: [{weight: 260, reps: 3}, {weight: 275, reps: 1}] }
  ],
  "2025-11-15": [
    { name: "Rows", sets: [{weight: 185, reps: 8}, {weight: 185, reps: 8}] }
  ],
  "2025-11-16": [
    { name: "Squat", sets: [{weight: 275, reps: 6}, {weight: 305, reps: 3}] }
  ],
  "2025-11-17": [
    { name: "Bench Press", sets: [{weight: 225, reps: 10}, {weight: 245, reps: 6}] }
  ],
  "2025-11-18": [
    { name: "Deadlift", sets: [{weight: 395, reps: 3}, {weight: 415, reps: 2}] }
  ],
  "2025-11-19": [
    { name: "OHP", sets: [{weight: 115, reps: 7}, {weight: 135, reps: 2}] }
  ],
  "2025-11-20": [
    { name: "Bench Press", sets: [{weight: 250, reps: 4}, {weight: 270, reps: 2}] }
  ],
  "2025-11-21": [
    { name: "Pull Ups", sets: [{weight: 0, reps: 12}, {weight: 0, reps: 10}] }
  ],
  "2025-11-22": [
    { name: "Squat", sets: [{weight: 285, reps: 5}, {weight: 305, reps: 3}] }
  ],
  "2025-11-23": [
    { name: "Bench Press", sets: [{weight: 245, reps: 5}, {weight: 265, reps: 3}] }
  ],
  "2025-11-24": [
    { name: "Deadlift", sets: [{weight: 405, reps: 2}, {weight: 435, reps: 1}] }
  ],
  "2025-11-25": [
    { name: "OHP", sets: [{weight: 115, reps: 6}, {weight: 130, reps: 3}] }
  ],
  "2025-11-26": [
    { name: "Bench Press", sets: [{weight: 260, reps: 3}, {weight: 275, reps: 1}] }
  ],
  "2025-11-27": [
    { name: "Pull Ups", sets: [{weight: 25, reps: 5}, {weight: 25, reps: 4}] }
  ],
  "2025-11-28": [
    { name: "Bench Press", sets: [{weight: 225, reps: 10}, {weight: 245, reps: 6}] }
  ]
};
localStorage.setItem("workouts", JSON.stringify(data));

// NOTES: how data is stored for ref
// data -> key: date ("2025-11-28");
// [{ name: "Bench", 
// Sets: [{weight: 200, reps: 10}, {weight: 225, reps: 5}] }], ...
// 
// const data = JSON.parse(localStorage.getItem("workouts")) || {};

let today = new Date(); 
let currentYear = today.getFullYear();
let currentMonth = today.getMonth(); 
let currentDay = today.getDate(); 

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

    let weeklyTotals = getWeeklyTotals("Bench Press"); // default lift

    const totalsChart = new Chart(totalsCh, {
        type: "line",
        data: {
            labels: Object.keys(weeklyTotals),
            datasets: [{
                label: "Totals",
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
                    text: "Weekly Totals (Last 7 Days)"
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

    let oneRepMax = getOneRMWeekly("Bench Press"); // default lift

    const oneRMChart = new Chart(oneRMCh, {
        type: "line",
        data: {
            labels: Object.keys(oneRepMax),
            datasets: [{
                label: "Totals",
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
                    text: "Weekly One RM (Last 7 Days)"
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
        const tData = getWeeklyTotals("Bench Press");
        totalsChart.data.labels = Object.keys(tData);
        totalsChart.data.datasets[0].data = Object.values(tData);
        totalsChart.options.plugins.title.text = "Weekly Totals (Last 7 Days)";
        totalsChart.update();
        // 1RM data
        const oData = getOneRMWeekly("Bench Press");
        oneRMChart.data.labels = Object.keys(oData);
        oneRMChart.data.datasets[0].data = Object.values(oData);
        oneRMChart.options.plugins.title.text = "Weekly 1RM (Last 7 Days)";
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
        const tData = getMonthlyTotals("Bench Press");
        totalsChart.data.labels = Object.keys(tData);
        totalsChart.data.datasets[0].data = Object.values(tData);
        totalsChart.options.plugins.title.text = "Monthly Totals";
        totalsChart.update();
        // 1RM data
        const oData = getOneRMMonthly("Bench Press");
        oneRMChart.data.labels = Object.keys(oData);
        oneRMChart.data.datasets[0].data = Object.values(oData);
        oneRMChart.options.plugins.title.text = "Monthly 1RM";
        oneRMChart.update();
    });

});