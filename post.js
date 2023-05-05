const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('./db');

// Middleware
app.use(bodyParser.json());

// Endpoint for adding new business
app.post('/business', (req, res) => {
  const { name, address, category } = req.body;

  // Insert data to database
  const sql = 'INSERT INTO businesses (name, address, category) VALUES (?, ?, ?)';
  db.run(sql, [name, address, category], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal server error');
    } else {
      res.status(201).send('Business added successfully');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
