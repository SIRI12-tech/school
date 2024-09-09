require('dotenv').config(); // Load environment variables
const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // Gmail as the email service
  auth: {
    user: process.env.EMAIL_USER, // Email address from .env
    pass: process.env.EMAIL_PASS, // App password or email password from .env
  },
});

// Function to send OTP email
function sendOTP(email, otp) {
  console.log('Sending OTP to:', email); // Debug: Log recipient email
  console.log('OTP:', otp); // Debug: Log OTP being sent

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email
    to: email, // Recipient's email
    subject: 'Your OTP for School Result Portal', // Email subject
    text: `Your OTP is ${otp}. Please use this to verify your email.`, // Email body
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending OTP email:', error); // Log error if sending fails
    } else {
      console.log('OTP email sent:', info.response); // Log response if sending succeeds
    }
  });
}

module.exports = { sendOTP };
