


$(document).ready(function() {
  $.get('http://localhost:3000/accounts', function(data) {
        var tableBody = $('#accountTableBody');
        tableBody.empty();
        data.forEach(function(row, index) {
            var tr = $('<tr>');
            tr.append($('<td>').text(index + 1));
            tr.append($('<td>').text(row.passenger_name));
            tr.append($('<td>').text(row.contacts));
            tr.append($('<td>').text(row.flight_id));
            tr.append($('<td>').html('<a href=""><i class="fa fa-pencil"></i></a><a href="#myModal" role="button" data-toggle="modal"><i class="fa fa-trash-o"></i></a>'));
            tableBody.append(tr);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('accountForm');
  if (form) {
      form.addEventListener('submit', function(event) {
          event.preventDefault(); // prevent the default form submission behavior

          // Get the form data
          const formData = new FormData(event.target);
          const contacts = formData.get('email');
          const username = formData.get('username');
          const flightId = flightDropdown.value; 

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
.catch((error) => {
    console.error('Error:', error);
    // Handle the error
});
      });
  } else {
      console.error('Form element with ID "accountForm" not found.');
  }
});