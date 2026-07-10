// Toggle Visibility between Login and Registration boxes
function toggleAuthForm() {
  const loginBox = document.getElementById('login-box');
  const registerBox = document.getElementById('register-box');
  
  loginBox.classList.toggle('hidden');
  registerBox.classList.toggle('hidden');
}

// Handle Form Submissions
document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  
  console.log("Attempting login with:", email);
  // Future deployment link connection logic goes here!
  alert("Form layout setup valid! Backend endpoint hookup is next.");
});

document.getElementById('register-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  const role = document.getElementById('reg-role').value;
  
  console.log("Registering user profile:", { name, email, role });
  alert("Registration form baseline capture active!");
});

