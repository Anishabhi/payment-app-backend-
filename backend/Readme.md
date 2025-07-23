Payment App - Backend

This is the backend API for the Payment App.  
It is built with Node.js, Express, and MySQL.

---
Features
- Stores customer data (name, account number, EMI details).
- Handles payment records and history.
- Provides REST APIs for the React Native frontend.

---

Tech Stack
- Node.js
- Express
- MySQL
- CORS & Body-Parser

---

 Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/Anishabhi/payment-app-backend-.git

2. cd payment-app-backend-


3. npm install

4.Create a .env file and add:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=payment_app
PORT=5000


7. Import the payment_app.sql database into MySQL:

   CREATE DATABASE payment_app;
USE payment_app;
-- Add the tables & sample data from the SQL file

8. node server.js

