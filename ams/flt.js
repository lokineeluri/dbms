$(document).ready(() => {
  // Populate "from" and "to" dropdown options
  populateDropdown('#from', ['Lahore', 'Karachi', 'Islamabad']);
  populateDropdown('#to', ['Lahore', 'Karachi', 'Islamabad']);

  $('form').submit((e) => {
    e.preventDefault();
    const from = $('#from').val();
    const to = $('#to').val();
    $.get(`http://localhost:3000/flights?from=${from}&to=${to}`, (data) => {
      if (data.length === 0) {
        alert('No flights available');
      } else {
        // Render flight details dynamically
        $('#flightDetails tbody').html(renderFlightDetails(data));
      }
    })
    .fail(function(xhr, status, error) {
      alert('An error occurred: ' + error);
    });
  });
});

function populateDropdown(selectId, options) {
  const dropdown = $(selectId);
  dropdown.empty();
  dropdown.append('<option value="">Select</option>');
  options.forEach(option => {
    dropdown.append(`<option value="${option}">${option}</option>`);
  });
}

function renderFlightDetails(data) {
  let html = '';
  data.forEach((flight) => {
    html += `<tr>
              <td>${flight.capacity || 'N/A'}</td>
              <td>${flight.flight_id || 'N/A'}</td>
              <td>${flight.departure || 'N/A'}</td>
              <td>${flight.arrival || 'N/A'}</td>
              <td>${flight.flight_date || 'N/A'}</td>
            </tr>`;
  });
  return html;
}