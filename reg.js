function validateForm() {
    var fullName = document.getElementById('fullName').value;
    var email = document.getElementById('email').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    // Simple email validation (regex)
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return false;
    }
  
    // Password strength check (minimum 8 characters)
    if (password.length < 8) {
      alert('Password should be at least 8 characters long.');
      return false;
    }
  
    // You can add more complex password strength checks here
  
    // If all validations pass, show confirmation and prevent form submission
    document.getElementById('registrationForm').style.display = 'none';
    document.getElementById('confirmation').classList.remove('hidden');
    return false; // Prevent form submission for this example
  }
  