// Base routing configuration target pointing directly to local system test server host
const API_BASE_URL = "http://localhost:5000/api";

// Save the system verification tokens safely into user browser session registers
function setAuthToken(token) {
  localStorage.setItem('bm_auth_token', token);
}

function getAuthToken() {
  return localStorage.getItem('bm_auth_token');
}

// Global API Request Handler Helper
async function makeSecureRequest(endpoint, method = 'GET', bodyData = null, isMultipart = false) {
  const token = getAuthToken();
  const headers = {};
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  let options = { method, headers };

  if (bodyData) {
    if (isMultipart) {
      // Form content boundary values are initialized implicitly by browsers during multi-part stream setups
      options.body = bodyData;
    } else {
      headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(bodyData);
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    return await response.json();
  } catch (err) {
    console.error(`[API Network Error Link Broken]: ${err.message}`);
    return { success: false, message: "Network synchronization error. Check server operation state." };
  }
}
