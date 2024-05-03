// Function to fetch airplane types from the server
async function fetchAirplaneTypes() {
  try {
    const response = await fetch('http://localhost:3000/api/airplaneTypes');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching airplane types:', error);
    return [];
  }
}

// Function to populate the dropdown with airplane types
async function populateAirplaneTypeDropdown() {
  const airplaneTypeDropdown = document.getElementById('airplaneTypeDropdown');
  const airplaneTypes = await fetchAirplaneTypes();

  // Clear existing options
  airplaneTypeDropdown.innerHTML = '<option value="">Select Airplane Type</option>';

  // Add new options from the database
  airplaneTypes.forEach(type => {
    const option = document.createElement('option');
    option.value = type.airplanetype_id;
    option.text = `${type.company} (Capacity: ${type.capacity})`;
    airplaneTypeDropdown.add(option);
  });
}

// Call the populateAirplaneTypeDropdown function when the page loads
window.addEventListener('DOMContentLoaded', populateAirplaneTypeDropdown);
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('flightForm');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      // Prevent the default form submission
      const formData = new FormData(event.target);
      const flightId = formData.get('flightId');
      const airplaneTypeId = formData.get('airplaneTypeId');
      const from = formData.get('from');
      const to = formData.get('to');
      const departureDate = formData.get('departureDate');

      // Create an object with the form data
      const data = {
        flight_id: flightId,
        airplanetype_id: airplaneTypeId,
        airport_code: from, // Assuming 'from' is the airport code
        arrival: to,
        departure: from,
        flight_date: departureDate
      };

      // Send a POST request to the server
      fetch('http://localhost:3000/api/flights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data.message);
          // Reset or clear the form if needed
        })
        .catch((error) => {
          console.error('Error:', error);
          // Additional error handling
          error.response.text().then(body => {
            console.error('Response body:', body);
          });
        });
    });
  } else {
    console.error('Element with ID "flightForm" not found.');
  }
});




