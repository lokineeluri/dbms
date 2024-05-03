document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('accountForm');
  const flightDropdown = document.getElementById('flightDropdown');

  // Fetch available flight IDs and populate the dropdown menu
  fetch('http://localhost:3000/flights')
    .then(response => response.json())
    .then(data => {
      data.forEach(flight => {
        const option = document.createElement('option');
        option.text = flight.flight_id;
        flightDropdown.add(option);
      });
    })
    .catch(error => console.error('Error fetching flights:', error));

  if (form) {
      form.addEventListener('submit', function(event) {
          event.preventDefault(); // prevent the default form submission behavior

          // Get the form data
          const formData = new FormData(event.target);
          const contacts = formData.get('email');
          const username = formData.get('username');
          const flightId = flightDropdown.value; // Get selected flight ID from dropdown

          // Send the data to the backend server using AJAX
          fetch('http://localhost:3000/createPassenger', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ contacts, username, flightId })
          })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            // Handle the successful response from the server
          })
          .catch(error => console.error('Error:', error));
      });
  } else {
      console.error('Form element with ID "accountForm" not found.');
  }
});
