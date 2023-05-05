const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

// Koneksi ke database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'business_db'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Database connected');
});

// Endpoint GET /business
app.get('/business', (req, res) => {
  const sql = 'SELECT * FROM business';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

// Endpoint GET /business/:id
app.get('/business/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM business WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result[0]);
  });
});

// Endpoint POST /business
app.post('/business', (req, res) => {
  const { name, address, city, state, zip } = req.body;
  const sql = `INSERT INTO business (name, address, city, state, zip) VALUES ('${name}', '${address}', '${city}', '${state}', '${zip}')`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send('Business added');
  });
});

// Endpoint PUT /business/:id
app.put('/business/:id', (req, res) => {
  const id = req.params.id;
  const { name, address, city, state, zip } = req.body;
  const sql = `UPDATE business SET name = '${name}', address = '${address}', city = '${city}', state = '${state}', zip = '${zip}' WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send('Business updated');
  });
});

// Endpoint DELETE /business/:id
app.delete('/business/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM business WHERE id = ${id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send('Business deleted');
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
