document.addEventListener('DOMContentLoaded', () => {
  console.log('Document loaded and script running!');

  // Handle registration form submission
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(registerForm);
      const data = {
        studentId: formData.get('studentId'),
        email: formData.get('email'),
        password: formData.get('password'),
      };

      try {
        const response = await fetch('/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log(result);
        // Handle successful registration here (e.g., redirect, show message)
        if (result.success) {
          window.location.href = '/verify.html'; // Redirect to OTP verification
        } else {
          // Handle registration failure (e.g., show error message)
          alert(result.message || 'Registration failed.');
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle errors here (e.g., show error message)
        alert('An error occurred. Please try again.');
      }
    });
  }

  // Handle login form submission
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(loginForm);
      const data = {
        studentId: formData.get('studentId'),
        password: formData.get('password'),
      };

      try {
        const response = await fetch('/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log(result);
        // Handle successful login here (e.g., redirect to dashboard)
        if (result.success) {
          window.location.href = '/dashboard.html';
        } else {
          // Handle login failure (e.g., show error message)
          alert(result.message || 'Login failed.');
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle errors here (e.g., show error message)
        alert('An error occurred. Please try again.');
      }
    });
  }

  // Handle OTP verification form submission
  const verifyForm = document.getElementById('verifyForm');
  if (verifyForm) {
    verifyForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(verifyForm);
      const data = {
        studentId: formData.get('studentId'),
        otp: formData.get('otp'),
      };

      try {
        const response = await fetch('/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log(result);
        // Handle successful OTP verification here (e.g., redirect to dashboard)
        if (result.success) {
          window.location.href = '/dashboard.html';
        } else {
          // Handle OTP verification failure (e.g., show error message)
          alert(result.message || 'OTP verification failed.');
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle errors here (e.g., show error message)
        alert('An error occurred. Please try again.');
      }
    });
  }

  // Handle result form submission (New functionality)
  const resultForm = document.getElementById('resultForm');
  if (resultForm) {
    const resultMessage = document.getElementById('resultMessage');

    resultForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const score = parseInt(document.getElementById('score').value);
      let message = '';

      if (isNaN(score)) {
        message = 'Please enter a valid score.';
      } else if (score >= 50) {
        // Assuming 50 is the passing mark
        message = `You passed with a score of ${score}. Congratulations!`;
      } else {
        message = `You failed with a score of ${score}. Better luck next time.`;
      }

      resultMessage.textContent = message;
    });
  }
});
