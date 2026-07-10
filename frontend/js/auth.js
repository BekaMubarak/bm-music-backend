// Toggle Visibility between Login and Registration boxes
function toggleAuthForm() {
  const loginBox = document.getElementById('login-box');
  const registerBox = document.getElementById('register-box');
  
  loginBox.classList.toggle('hidden');
  registerBox.classList.toggle('hidden');
}

// Handle Login Submission
document.getElementById('login-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  
  // Use the global request helper from app.js to talk to our server
  const response = await makeSecureRequest('/auth/login', 'POST', { email, password });

  if (response.success) {
    // Save the security token so the app remembers who you are
    localStorage.setItem('bm_auth_token', response.token);
    localStorage.setItem('bm_user_role', response.user.role);
    
    // Redirect straight into the music player dashboard
    window.location.href = 'dashboard.html';
  } else {
    alert("Login Failed: " + response.message);
  }
});

// Handle Registration Submission
document.getElementById('register-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  const role = document.getElementById('reg-role').value;
  
  const response = await makeSecureRequest('/auth/register', 'POST', { name, email, password, role });

  if (response.success) {
    alert("Account created successfully! Shifting to login screen.");
    toggleAuthForm();
  } else {
    alert("Registration Failed: " + response.message);
  }
});
