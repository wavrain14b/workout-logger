// After the user clicks a specific workout to be edited this is the logic of the html they will be redirected to


// -- variables --
const params = new URLSearchParams(window.location.search);
const day = params.get("day");
const month = params.get("month");
const year = params.get("year");

const addSetBtn = document.querySelector(".change-sets-btn");
addSetBtn.addEventListener("click", addSet);

function addSet() {
    const newSet = document.createElement("div");
    newSet.classList.add("set");

    newSet.innerHTML = `
        <input class="weight" placeholder="Weight">
        <input class="reps" placeholder="Reps">
    `;

    userInterfaceContainer.appendChild(newSet); // attaches it to the page
}

function getMonthName(month){
    const monthNumber = parseInt(month); // convert string to number
    const monthNames = [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ];
    return monthNames[monthNumber - 1]; // array is 0-based
}
