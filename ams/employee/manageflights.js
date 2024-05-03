// Function to fetch flight data from the server
async function fetchFlightData() {
  const response = await fetch('/api/flights');
  const flights = await response.json();
  return flights;
}
async function fetchFlightData() {
  const response = await fetch('http://localhost:3000/api/flights');
  const flights = await response.json();
  return flights;
}

// Function to populate the table with flight data
function populateTable(flights) {
  const tableBody = document.getElementById('flight-table-body');
  flights.forEach((flight, index) => {
 
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${flight.flight_id}</td>
      <td>${flight.departure}</td>
      <td>${flight.arrival}</td>
      <td>${flight.flight_date}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Fetch flight data and populate the table
fetchFlightData()
  .then(flights => populateTable(flights))
  .catch(error => console.error('Error fetching flight data:', error));