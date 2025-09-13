const form = document.querySelector("#attendanceForm");
const resetBtn = document.querySelector(".b2");
const statusDiv = document.querySelector(".status");

// Helper functions
function attendencePerform(present, total) {
  if (total === 0) return 0;
  return ((present / total) * 100).toFixed(2);
}

function holidayChecker(holidays, date) {
  return holidays.includes(date);
}

function leaveChecker(leaves, date) {
  return leaves.includes(date);
}

function sundayChecker(sundays, date) {
  return sundays.includes(date);
}

function getSundays() {
  let sundays = [];
  let now = new Date();
  let current = new Date(now);

  for (let i = 0; i < 28; i++) {
    if (current.getDay() === 0) {
      sundays.push(current.getDate());
    }
    current.setDate(current.getDate() + 1);
  }
  return sundays;
}

// Main calculation
function attendenceCalculator(holidays, leaves, n, present, total, startDate, sundays, periodsPerDay) {
  let resultHTML = "";
  let current = new Date(startDate);

  for (let i = 0; i < n; i++) {
    let day = current.getDate();
    let percentage;

    if (leaveChecker(leaves, day)) {
      total += periodsPerDay;
      percentage = attendencePerform(present, total);
      resultHTML += `<p>${day} → ${percentage}% (Leave)</p>`;
    } else if (holidayChecker(holidays, day)) {
      resultHTML += `<p>${day} → Holiday</p>`;
    } else if (sundayChecker(sundays, day)) {
      resultHTML += `<p>${day} → Sunday</p>`;
    } else {
      present += periodsPerDay;
      total += periodsPerDay;
      percentage = attendencePerform(present, total);
      resultHTML += `<p>${day} → ${percentage}%</p>`;
    }

    current.setDate(current.getDate() + 1);
  }

  statusDiv.innerHTML = resultHTML;
}

// Form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let periodsPerDay = parseInt(document.querySelector(".custom-select").value);
  let present = parseInt(document.querySelector("#inp1").value) || 0;
  let total = parseInt(document.querySelector("#inp2").value) || 0;
  let leaves = document.querySelector("#inp3").value.split(" ").map(Number).filter(n => !isNaN(n));
  let holidays = document.querySelector("#inp4").value.split(" ").map(Number).filter(n => !isNaN(n));
  let postedToday = document.querySelector("#singleRadio").checked;
  let sundays = getSundays();

  if (!postedToday) {
    total -= periodsPerDay;
  }

  let now = new Date();
  attendenceCalculator(holidays, leaves, 28, present, total, now, sundays, periodsPerDay);
});

// Reset form
resetBtn.addEventListener("click", () => {
  document.querySelector(".custom-select").selectedIndex = 0;
  document.querySelector("#singleRadio").checked = false;
  statusDiv.innerHTML = "";
});
