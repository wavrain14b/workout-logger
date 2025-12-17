// =======================
// STATISTICS PAGE SCRIPT
// =======================

// FILLER DATA
// NOTES: how data is stored for ref
// data -> key: date ("2025-11-28")
// value -> array of workouts
// [
//   {
//     name: "Bench Press",
//     sets: [{ weight: 200, reps: 10 }, { weight: 225, reps: 5 }]
//   }
// ]

const data = JSON.parse(localStorage.getItem("workouts")) || {};

// ----------------------
// DOM REFERENCES
// ----------------------
const liftInput = document.getElementById("workout-name-input");
const weeklyBtn = document.getElementById("weeklyBtn");
const monthlyBtn = document.getElementById("monthlyBtn");
const applyBtn = document.getElementById("applyDateFilter");

const volumeCtx = document.getElementById("volumeChart").getContext("2d");
const totalsCtx = document.getElementById("totalsChart").getContext("2d");
const oneRMCtx = document.getElementById("oneRMChart").getContext("2d");

// ----------------------
// DATE FILTER STATE
// ----------------------
let dateFilter = {
    start: null,
    end: null
};

// ----------------------
// SEED DATA (DEV ONLY)
// ----------------------
if (Object.keys(data).length === 0) {
    const today = getDateXDaysAgo(0);
    data[today] = [
        { name: "Bench Press", sets: [{ weight: 225, reps: 10 }] },
        { name: "Squat", sets: [{ weight: 315, reps: 5 }] }
    ];
    localStorage.setItem("workouts", JSON.stringify(data));
}

// ----------------------
// DATE HELPERS
// ----------------------

// Returns YYYY-MM-DD for X days ago
function getDateXDaysAgo(x) {
    const d = new Date();
    d.setDate(d.getDate() - x);
    return d.toISOString().split("T")[0];
}

// Returns array of YYYY-MM-DD between two dates
function getDatesBetween(start, end) {
    const dates = [];
    const cur = new Date(start);

    while (cur <= end) {
        dates.push(cur.toISOString().split("T")[0]);
        cur.setDate(cur.getDate() + 1);
    }

    return dates;
}

// ----------------------
// METRIC CALCULATIONS
// ----------------------

// Total volume across ALL lifts for a day
function calculateVolumeForDay(date) {
    if (!data[date]) return 0;

    let total = 0;
    data[date].forEach(w =>
        w.sets.forEach(s => total += s.weight * s.reps)
    );
    return total;
}

// Total volume for ONE lift on a day
function calculateVolumeForWorkout(lift, date) {
    if (!data[date]) return 0;

    let total = 0;
    data[date].forEach(w => {
        if (w.name === lift) {
            w.sets.forEach(s => total += s.weight * s.reps);
        }
    });
    return total;
}

// Estimated 1RM (Epley)
function estimate1RM(lift, date) {
    if (!data[date]) return 0;

    let max = 0;
    data[date].forEach(w => {
        if (w.name === lift) {
            w.sets.forEach(s => {
                const est = s.weight * (1 + s.reps / 30);
                max = Math.max(max, est);
            });
        }
    });
    return max;
}

// ----------------------
// RANGE COMPUTATION
// ----------------------
function volumeForRange(start, end) {
    const out = {};
    getDatesBetween(start, end).forEach(d => {
        out[d] = calculateVolumeForDay(d);
    });
    return out;
}

function totalsForRange(lift, start, end) {
    const out = {};
    getDatesBetween(start, end).forEach(d => {
        out[d] = calculateVolumeForWorkout(lift, d);
    });
    return out;
}

function oneRMForRange(lift, start, end) {
    const out = {};
    getDatesBetween(start, end).forEach(d => {
        out[d] = estimate1RM(lift, d);
    });
    return out;
}

// ----------------------
// PRESET WINDOWS
// ----------------------
function weeklyWindow() {
    return volumeForRange(
        new Date(Date.now() - 6 * 86400000),
        new Date()
    );
}

function monthlyWindow() {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    return volumeForRange(start, now);
}

// ----------------------
// CHART INITIALIZATION
// ----------------------
const volumeChart = new Chart(volumeCtx, {
    type: "line",
    data: { labels: [], datasets: [{ label: "Volume", data: [] }] },
    options: { responsive: true }
});

const totalsChart = new Chart(totalsCtx, {
    type: "line",
    data: { labels: [], datasets: [{ label: "Totals", data: [] }] },
    options: { responsive: true }
});

const oneRMChart = new Chart(oneRMCtx, {
    type: "line",
    data: { labels: [], datasets: [{ label: "1RM", data: [] }] },
    options: { responsive: true }
});

// ----------------------
// RENDER ALL CHARTS
// ----------------------
function renderCharts(volumeData, totalsData, oneRMData, titleSuffix) {
    volumeChart.data.labels = Object.keys(volumeData);
    volumeChart.data.datasets[0].data = Object.values(volumeData);
    volumeChart.options.plugins = { title: { display: true, text: `Volume ${titleSuffix}` }};
    volumeChart.update();

    totalsChart.data.labels = Object.keys(totalsData);
    totalsChart.data.datasets[0].data = Object.values(totalsData);
    totalsChart.options.plugins = { title: { display: true, text: `Totals ${titleSuffix}` }};
    totalsChart.update();

    oneRMChart.data.labels = Object.keys(oneRMData);
    oneRMChart.data.datasets[0].data = Object.values(oneRMData);
    oneRMChart.options.plugins = { title: { display: true, text: `1RM ${titleSuffix}` }};
    oneRMChart.update();
}

// ----------------------
// BUTTON HANDLERS
// ----------------------
weeklyBtn.addEventListener("click", () => {
    const lift = liftInput.value;
    const end = new Date();
    const start = new Date(Date.now() - 6 * 86400000);

    renderCharts(
        volumeForRange(start, end),
        totalsForRange(lift, start, end),
        oneRMForRange(lift, start, end),
        "(Last 7 Days)"
    );
});

monthlyBtn.addEventListener("click", () => {
    const lift = liftInput.value;
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);

    renderCharts(
        volumeForRange(start, now),
        totalsForRange(lift, start, now),
        oneRMForRange(lift, start, now),
        "(This Month)"
    );
});

applyBtn.addEventListener("click", () => {
    const startVal = document.getElementById("startDate").value;
    const endVal = document.getElementById("endDate").value;

    if (!startVal || !endVal) {
        alert("Select both dates");
        return;
    }

    const lift = liftInput.value;
    const start = new Date(startVal);
    const end = new Date(endVal);

    renderCharts(
        volumeForRange(start, end),
        totalsForRange(lift, start, end),
        oneRMForRange(lift, start, end),
        "(Custom Range)"
    );
});

// ----------------------
// INITIAL LOAD
// ----------------------
weeklyBtn.click();
