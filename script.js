// DOM Elements
const form = document.getElementById("attendanceForm");
const resetBtn = document.getElementById("resetBtn");
const statusDiv = document.getElementById("statusGrid");
const resultsSection = document.getElementById("resultsSection");
let myChart = null;

// App Init
document.addEventListener('DOMContentLoaded', loadState);

// Event Handlers
form.addEventListener("submit", (e) => {
  e.preventDefault();
  calculateAndRender();
  saveState();
});

resetBtn.addEventListener("click", () => {
  form.reset();
  resultsSection.classList.add('hidden');
  localStorage.removeItem('attendanceParams');
  if (myChart) myChart.destroy();
});

// Utilities
function calculatePercentage(present, total) {
  if (total === 0) return 0;
  return ((present / total) * 100).toFixed(2);
}

function parseInputString(str) {
  return str ? str.trim().split(/\s+/).map(Number).filter(n => !isNaN(n)) : [];
}

function getSundays() {
  let sundays = [];
  let current = new Date();

  for (let i = 0; i < 28; i++) {
    if (current.getDay() === 0) {
      sundays.push(current.getDate());
    }
    current.setDate(current.getDate() + 1);
  }
  return sundays;
}

// Main Logic
function calculateAndRender() {
  const periodsPerDay = parseInt(document.getElementById("periodsPerDay").value);
  const postedToday = document.getElementById("postedToday").checked;
  let present = parseInt(document.getElementById("attended").value) || 0;
  let total = parseInt(document.getElementById("total").value) || 0;

  const leaves = parseInputString(document.getElementById("leaves").value);
  const holidays = parseInputString(document.getElementById("holidays").value);
  const sundays = getSundays();

  if (!postedToday) {
    total -= periodsPerDay;
  }

  // Generate Data for Chart and Grid
  const labels = [];
  const dataPoints = [];
  let resultHTML = "";

  let current = new Date();
  // If not posted today, we assume calculation starts from "tomorrow" logic effectively for projection?
  // Actually original logic just used "current" date. Let's stick to it.

  let currentPresent = present;
  let currentTotal = total;

  for (let i = 0; i < 28; i++) {
    let day = current.getDate();
    let month = current.toLocaleString('default', { month: 'short' });
    let dateStr = `${month} ${day}`;
    let status = 'attended'; // attended, leave, holiday, Sunday
    let percentage = 0;

    if (leaves.includes(day)) {
      currentTotal += periodsPerDay;
      status = 'leave';
    } else if (holidays.includes(day)) {
      status = 'holiday';
    } else if (sundays.includes(day)) {
      status = 'sunday';
    } else {
      currentPresent += periodsPerDay;
      currentTotal += periodsPerDay;
      status = 'attended';
    }

    percentage = calculatePercentage(currentPresent, currentTotal);

    // Add to Chart Data
    labels.push(day);
    dataPoints.push(percentage);

    // Add to Grid
    let statusClass = 'neutral';
    let statusText = '';

    if (status === 'leave') {
      statusClass = 'bad';
      statusText = `<i class="fa-solid fa-xmark"></i> Leave`;
    } else if (status === 'holiday' || status === 'sunday') {
      statusClass = 'neutral';
      statusText = `<i class="fa-solid fa-mug-hot"></i> Off`;
    } else {
      statusClass = 'good';
      statusText = `${percentage}%`;
    }

    resultHTML += `
      <div class="stat-card ${statusClass}">
        <span class="stat-date">${dateStr}</span>
        <div class="stat-value">${statusText}</div>
      </div>
    `;

    current.setDate(current.getDate() + 1);
  }

  statusDiv.innerHTML = resultHTML;
  resultsSection.classList.remove('hidden');

  // Render Chart
  renderChart(labels, dataPoints);

  // Scroll to results
  resultsSection.scrollIntoView({ behavior: 'smooth' });
}

function renderChart(labels, data) {
  const ctx = document.getElementById('attendanceChart').getContext('2d');

  if (myChart) {
    myChart.destroy();
  }

  // Gradient fill
  let gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, 'rgba(76, 201, 240, 0.5)');
  gradient.addColorStop(1, 'rgba(76, 201, 240, 0.0)');

  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Attendance %',
        data: data,
        backgroundColor: gradient,
        borderColor: '#4cc9f0',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#fff',
        pointRadius: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: 'index',
          intersect: false,
          backgroundColor: 'rgba(0,0,0,0.8)',
          titleColor: '#fff',
          bodyColor: '#fff'
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          grid: { color: 'rgba(255,255,255,0.1)' },
          ticks: { color: '#e0e0e0' }
        },
        x: {
          grid: { display: false },
          ticks: { color: '#e0e0e0' }
        }
      }
    }
  });
}

function saveState() {
  const params = {
    periods: document.getElementById("periodsPerDay").value,
    posted: document.getElementById("postedToday").checked,
    attended: document.getElementById("attended").value,
    total: document.getElementById("total").value,
    leaves: document.getElementById("leaves").value,
    holidays: document.getElementById("holidays").value
  };
  localStorage.setItem('attendanceParams', JSON.stringify(params));
}

function loadState() {
  const data = localStorage.getItem('attendanceParams');
  if (data) {
    const params = JSON.parse(data);
    document.getElementById("periodsPerDay").value = params.periods || "7";
    document.getElementById("postedToday").checked = params.posted || false;
    document.getElementById("attended").value = params.attended || "";
    document.getElementById("total").value = params.total || "";
    document.getElementById("leaves").value = params.leaves || "";
    document.getElementById("holidays").value = params.holidays || "";

    // Auto calculate if data exists
    if (params.attended && params.total) {
      calculateAndRender();
    }
  }
}
