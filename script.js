const DATA_URL = "https://bautistaaby.github.io/Tomatosense/"; // Change this

async function fetchData() {
  try {
    const response = await fetch(DATA_URL);
    const data = await response.json();

    document.getElementById("temperature").innerText = data.temperature + " °C";
    document.getElementById("humidity").innerText = data.humidity + " %";
    document.getElementById("moisture").innerText = data.moisture + " %";

    // Add to charts + history table like before
    updateUI(data.temperature, data.humidity, data.moisture);
  } catch (error) {
    console.log("Error loading data:", error);
  }
}

setInterval(fetchData, 5000);
fetchData();
