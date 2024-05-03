$(document).ready(function() {
  // Fetch flight data from the server
  $.ajax({
    url: 'http://localhost:3000/api/flights',
    type: 'GET',
    success: function(data) {
      // Populate the "from" dropdown
      const fromSelect = $('#from');
      data.forEach(function(flight) {
        fromSelect.append(`<option value="${flight.departure}">${flight.departure}</option>`);
      });

      // Populate the "to" dropdown
      const toSelect = $('#to');
      data.forEach(function(flight) {
        toSelect.append(`<option value="${flight.arrival}">${flight.arrival}</option>`);
      });
    },
    error: function(xhr, status, error) {
      console.error('Error fetching flight data:', error);
    }
  });
});