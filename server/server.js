const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { registerUser, verifyOTP } = require('./auth');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.post('/register', (req, res) => {
  const { studentId, email, password } = req.body;
  const result = registerUser(studentId, email, password);
  res.json(result);
});

app.post('/verify-otp', (req, res) => {
  const { studentId, otp } = req.body;
  const result = verifyOTP(studentId, otp);
  res.json(result);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
