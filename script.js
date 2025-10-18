async function getSensorData() {
  const res = await fetch("http://YOUR_ESP_IP/data");
  const data = await res.json();
  tempEl.textContent = data.temp + " °C";
  humEl.textContent = data.humidity + " %";
  soilEl.textContent = data.moisture + " %";
}
setInterval(getSensorData, 4000);

