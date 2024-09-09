const users = require('./database.json');
const { sendOTP } = require('./mailer');

const otpStore = {};

function registerUser(studentId, email, password) {
  if (users[studentId]) {
    return { success: false, message: 'User already exists.' };
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[studentId] = otp;

  sendOTP(email, otp);

  users[studentId] = { studentId, email, password, verified: false };
  return { success: true };
}

function verifyOTP(studentId, otp) {
  if (otpStore[studentId] && otpStore[studentId] === otp) {
    users[studentId].verified = true;
    delete otpStore[studentId];
    return { success: true };
  } else {
    return { success: false, message: 'Invalid OTP.' };
  }
}

module.exports = { registerUser, verifyOTP };
