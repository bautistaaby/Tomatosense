const tempEl = document.getElementById("temperature");
const humEl = document.getElementById("humidity");
const soilEl = document.getElementById("moisture");
const historyTable = document.querySelector("#historyTable tbody");

function random(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1);
}

// Initialize Charts
const makeChart = (id, label, color) => new Chart(document.getElementById(id), {
  type: "line",
  data: { labels: [], datasets: [{ label, borderColor: color, data: [], fill: false }] },
  options: { responsive: true, scales: { y: { beginAtZero: true } } }
});

const tempChart = makeChart("tempChart", "Temperature (°C)", "#d43b3b");
const humChart = makeChart("humChart", "Humidity (%)", "#2b8a3e");
const moistChart = makeChart("moistChart", "Soil Moisture (%)", "#ff9a3c");

function addData(chart, value) {
  const now = new Date().toLocaleTimeString();
  chart.data.labels.push(now);
  chart.data.datasets[0].data.push(value);
  if (chart.data.labels.length > 10) {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
  }
  chart.update();
}

function addHistoryRow(temp, hum, soil) {
  const date = new Date().toLocaleString();
  const row = `<tr><td>${date}</td><td>${temp}</td><td>${hum}</td><td>${soil}</td></tr>`;
  historyTable.insertAdjacentHTML("afterbegin", row);
  if (historyTable.rows.length > 10) historyTable.deleteRow(10);
}

function updateData() {
  const temp = random(22, 32);
  const hum = random(60, 85);
  const soil = random(30, 70);

  tempEl.textContent = `${temp} °C`;
  humEl.textContent = `${hum} %`;
  soilEl.textContent = `${soil} %`;

  addData(tempChart, temp);
  addData(humChart, hum);
  addData(moistChart, soil);
  addHistoryRow(temp, hum, soil);
}

setInterval(updateData, 4000);
updateData();
