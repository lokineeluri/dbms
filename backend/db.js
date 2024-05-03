const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '9534',
  database: 'new_schema'
});
connection.connect((err) => {
  if (err) {
      console.error('Error connecting to MySQL database: ' + err.stack);
      return;
  }
  console.log('Connected to MySQL database as id ' + connection.threadId);
});
connection.query('SELECT * FROM passenger', (err, results) => {
  if (err) {
      console.error('Error executing query: ' + err.stack);
      return;
  }
  console.log('Query results:', results);
});



module.exports = connection;
