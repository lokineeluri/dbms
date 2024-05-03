const form = document.getElementById('airplaneTypeForm');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the default form submission

  const formData = new FormData(event.target);
  const capacity = formData.get('capacity');
  const weight = formData.get('weight');
  const company = formData.get('company');

  // Create an object with the form data
  const data = {
    capacity,
    weight,
    company,
  };

  // Send a POST request to the server
  fetch('http://localhost:3000/createAirplaneType', {
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
    });
});




///fetching airline type
// Fetch airplane type data from the server
fetch('http://localhost:3000/api/airplaneTypes')
  .then(response => response.json())
  .then(data => {
    // Get a reference to the table body
    const tableBody = document.querySelector('.table tbody');

    // Clear existing table rows
    tableBody.innerHTML = '';

    // Loop through the data and create table rows
    data.forEach((airplaneType, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${airplaneType.airplanetype_id}</td>
        <td>${airplaneType.capacity}</td>
        <td>${airplaneType.company}</td>
        <td>
          <a href=""><i class="fa fa-pencil"></i></a>
          <a href="#myModal" role="button" data-toggle="modal"><i class="fa fa-trash-o"></i></a>
        </td>
      `;
      tableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Error fetching airplane types:', error);
  });