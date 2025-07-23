const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('MySQL Connection Error:', err);
    return;
  }
  console.log('Connected to MySQL Database.');
});


app.get('/customers', (req, res) => {
  db.query('SELECT * FROM customers', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});


app.post('/payments', (req, res) => {
  const { account_number, payment_amount } = req.body;

  db.query('SELECT * FROM customers WHERE account_number = ?', [account_number], (err, customers) => {
    if (err) return res.status(500).json(err);
    if (customers.length === 0) return res.status(404).json({ message: 'Customer not found' });

    const customerId = customers[0].id;
    const paymentData = [customerId, new Date(), payment_amount, 'PAID'];

    db.query(
      'INSERT INTO payments (customer_id, payment_date, payment_amount, status) VALUES (?, ?, ?, ?)',
      paymentData,
      (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Payment recorded', payment_id: result.insertId });
      }
    );
  });
});


app.get('/payments/:account_number', (req, res) => {
  const accountNumber = req.params.account_number;
  const query = `
    SELECT p.id, p.payment_date, p.payment_amount, p.status
    FROM payments p
    JOIN customers c ON p.customer_id = c.id
    WHERE c.account_number = ?`;

  db.query(query, [accountNumber], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
