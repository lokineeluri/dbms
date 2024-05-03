const connection = require('./db');
const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();

app.use(cors({
  origin: 'http://127.0.0.1:5501',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// Parse incoming JSON data
app.use(bodyParser.json());

// Endpoint to fetch accounts
app.get('/accounts', (req, res) => {
  connection.query('SELECT passenger_name, contacts, flight_id FROM Passenger', (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Error fetching accounts');
      return;
    }
    res.send(results);
  });
});





// Endpoint to fetch all available flight IDs
app.get('/flights', (req, res) => {
  connection.query('SELECT flight_id FROM flight', (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Error fetching flights');
      return;
    }
    res.send(results);
  });
});







// Endpoint to create a new passenger
app.post('/createPassenger', (req, res) => {
  const { contacts, username, flightId } = req.body;

  // Generate the next passenger ID
  connection.query('SELECT MAX(passenger_id) AS maxId FROM Passenger', (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error generating passenger ID' });
      return;
    }

    const maxId = result[0].maxId || 0;
    const newPassengerId = maxId + 1;

    // Insert the new passenger into the database
    const query = 'INSERT INTO Passenger (passenger_id, flight_id, passenger_name, contacts) VALUES (?, ?, ?, ?)';
    connection.query(query, [newPassengerId, flightId, username, contacts], (err, result) => {
      if (err) {
        console.error('Error inserting passenger:', err);
        res.status(500).json({ error: 'Error creating passenger' });
        return;
      }

      res.status(200).json({ message: 'Passenger created successfully' });
    });
  });
});

// Endpoint to create a new airplane type
// Endpoint to create a new airplane type
app.post('/createAirplaneType', (req, res) => {
  const { capacity, weight, company } = req.body;

  // Generate the next airplane type ID
  connection.query('SELECT MAX(airplanetype_id) AS maxId FROM airplanetype', (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error generating airplane type ID' });
      return;
    }

    const maxId = result[0].maxId || 0;
    const newAirplaneTypeId = maxId + 1;

    // Insert the new airplane type into the database
    const query = 'INSERT INTO airplanetype (airplanetype_id, capacity, airplane_weight, company) VALUES (?, ?, ?, ?)';
    connection.query(query, [newAirplaneTypeId, capacity, weight, company], (err, result) => {
      if (err) {
        console.error('Error inserting airplane type:', err);
        res.status(500).json({ error: 'Error creating airplane type' });
        return;
      }
      res.status(200).json({ message: 'Airplane type created successfully' });
    });
  });
});

app.get('/api/airplaneTypes', (req, res) => {
  const query = 'SELECT airplanetype_id, capacity, company FROM airplanetype';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error fetching airplane types' });
      return;
    }
    res.json(results);
  });
});


app.get('/api/airplaneTypes', (req, res) => {
  const query = 'SELECT airplanetype_id, capacity, company FROM airplanetype';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Error fetching airplane types' });
      return;
    }
    res.json(results);
  });
});
app.post('/api/flights', (req, res) => {
  const {
    flight_id,
    airplanetype_id,
    arrival,
    departure,
    flight_date
  } = req.body;

  // SQL query to insert the flight data
  const query = `
    INSERT INTO flight (
      flight_id,
      airplanetype_id,
      arrival,
      departure,
      flight_date
    ) VALUES (
      ?, ?, ?, ?, ?
    )
  `;

  // Execute the query
  connection.query(
    query,
    [flight_id, airplanetype_id, arrival, departure, flight_date],
    (error, results) => {
      if (error) {
        console.error('Error inserting flight data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'Flight data inserted successfully' });
      }
    }
  );
});


app.get('/api/flights', (req, res) => {
  const query = 'SELECT flight_id, arrival, departure, flight_date FROM flight';
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});












app.get('/api/flights', (req, res) => {
  const query = 'SELECT departure, arrival FROM flight';
  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});




app.get('/flights', (req, res) => {
  const { from, to } = req.query;
  const sql = `
    SELECT f.flight_id, f.arrival, f.departure, f.flight_date, at.capacity
    FROM flight f
    JOIN airplanetype at ON f.airplanetype_id = at.airplanetype_id
    WHERE f.departure = ? AND f.arrival = ?
  `;
  connection.query(sql, [from, to], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(result);
    }
  });
});



// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});










