const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Password#1718', 
  database: 'creds'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
  });

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
    db.query(checkUserQuery, [username], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }
  
      if (result.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ message: 'Error hashing password', error: err });
        }
  
        const insertQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(insertQuery, [username, hashedPassword], (err, result) => {
          if (err) {
            return res.status(500).json({ message: 'Error inserting user', error: err });
          }
          return res.status(201).json({ message: 'User created successfully' });
        });
      });
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
    db.query(checkUserQuery, [username], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
      }

      if (result.length > 0) {
        const user = result[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            return res.status(500).json({ message: 'Error comparing passwords', error: err });
          }

          if (isMatch) {
            return res.status(200).json({ message: 'Login successful' });
          } else {
            return res.status(401).json({ message: 'Invalid credentials' });
          }
        });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    });
});

app.post('/home', () => {
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 