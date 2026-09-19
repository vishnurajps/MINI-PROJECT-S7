/**
 * AgroMarket Authentication Logic (auth.js)
 */

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const tabLoginBtn = document.getElementById('tab-login-btn');
  const tabRegisterBtn = document.getElementById('tab-register-btn');
  const loginSection = document.getElementById('login-section');
  const registerSection = document.getElementById('register-section');

  // Tab switching
  tabLoginBtn.addEventListener('click', () => {
    tabLoginBtn.classList.add('active');
    tabRegisterBtn.classList.remove('active');
    loginSection.style.display = 'block';
    registerSection.style.display = 'none';
  });

  tabRegisterBtn.addEventListener('click', () => {
    tabRegisterBtn.classList.add('active');
    tabLoginBtn.classList.remove('active');
    loginSection.style.display = 'none';
    registerSection.style.display = 'block';
  });

  // Dynamic Role Fields in Registration
  const roleRadios = document.querySelectorAll('input[name="role"]');
  const farmerFields = document.getElementById('farmer-fields');
  const deliveryFields = document.getElementById('delivery-fields');
  const advisoryFields = document.getElementById('advisory-fields');

  function updateRoleFields(role) {
    if (farmerFields) farmerFields.style.display = role === 'FARMER' ? 'block' : 'none';
    if (deliveryFields) deliveryFields.style.display = role === 'DELIVERY' ? 'block' : 'none';
    if (advisoryFields) advisoryFields.style.display = role === 'ADVISORY' ? 'block' : 'none';
  }

  roleRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      updateRoleFields(e.target.value);
    });
  });

  // Live QR generator preview when Farmer enters UPI ID
  const upiInput = document.getElementById('reg-upi');
  const qrPreview = document.getElementById('reg-qr-preview');
  if (upiInput && qrPreview) {
    upiInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      if (val.length > 3) {
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=${encodeURIComponent(val)}%26cu=INR`;
        qrPreview.src = qrUrl;
        qrPreview.parentElement.style.display = 'flex';
      }
    });
  }

  // Handle Login
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;

      try {
        const res = await fetch(`${API_BASE}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (data.success) {
          Auth.setUser(data.user, data.token);
          showToast(`Welcome back, ${data.user.fullName}!`, "success");
          redirectToRoleDashboard(data.user.role);
        } else {
          showToast(data.message || "Invalid login credentials", "error");
        }
      } catch (err) {
        showToast("Error connecting to server. Ensure backend is running.", "error");
        console.error(err);
      }
    });
  }

  // Handle Register
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const selectedRole = document.querySelector('input[name="role"]:checked').value;
      const upiId = document.getElementById('reg-upi') ? document.getElementById('reg-upi').value.trim() : null;
      let qrCodeUrl = null;
      if (selectedRole === 'FARMER' && upiId) {
        qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=${encodeURIComponent(upiId)}%26pn=${encodeURIComponent(document.getElementById('reg-name').value)}%26cu=INR`;
      }

      const payload = {
        fullName: document.getElementById('reg-name').value.trim(),
        email: document.getElementById('reg-email').value.trim(),
        password: document.getElementById('reg-password').value,
        phone: document.getElementById('reg-phone').value.trim(),
        district: document.getElementById('reg-district').value.trim(),
        state: document.getElementById('reg-state').value.trim(),
        address: document.getElementById('reg-address').value.trim(),
        role: selectedRole,

        // Farmer
        upiId: upiId,
        qrCodeUrl: qrCodeUrl,
        farmSizeAcres: document.getElementById('reg-farm-size') ? parseFloat(document.getElementById('reg-farm-size').value) || null : null,

        // Delivery
        vehicleType: document.getElementById('reg-vehicle-type') ? document.getElementById('reg-vehicle-type').value : null,
        vehicleNumber: document.getElementById('reg-vehicle-number') ? document.getElementById('reg-vehicle-number').value.trim() : null,
        bankAccountNo: document.getElementById('reg-bank-acc') ? document.getElementById('reg-bank-acc').value.trim() : null,
        bankIfsc: document.getElementById('reg-bank-ifsc') ? document.getElementById('reg-bank-ifsc').value.trim() : null,
        bankName: document.getElementById('reg-bank-name') ? document.getElementById('reg-bank-name').value.trim() : null,

        // Advisory
        specialization: document.getElementById('reg-specialization') ? document.getElementById('reg-specialization').value.trim() : null,
        qualification: document.getElementById('reg-qualification') ? document.getElementById('reg-qualification').value.trim() : null
      };

      try {
        const res = await fetch(`${API_BASE}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (data.success) {
          Auth.setUser(data.user, data.token);
          showToast("Account registered successfully!", "success");
          redirectToRoleDashboard(data.user.role);
        } else {
          showToast(data.message || "Registration failed", "error");
        }
      } catch (err) {
        showToast("Error connecting to server. Please try again.", "error");
        console.error(err);
      }
    });
  }
});

function redirectToRoleDashboard(role) {
  setTimeout(() => {
    if (role === 'FARMER') window.location.href = "farmer-dashboard.html";
    else if (role === 'BUYER') window.location.href = "buyer-dashboard.html";
    else if (role === 'DELIVERY') window.location.href = "delivery-dashboard.html";
    else if (role === 'ADVISORY') window.location.href = "advisory-dashboard.html";
    else window.location.href = "index.html";
  }, 700);
}

// Quick Demo Login Helper
window.quickLogin = function(role) {

  const demoAccounts = {
    FARMER: {
      email: "demo.farmer@agromarket.com",
      password: "demo123"
    },

    BUYER: {
      email: "demo.buyer@agromarket.com",
      password: "demo123"
    },

    DELIVERY: {
      email: "demo.delivery@agromarket.com",
      password: "demo123"
    },

    ADVISORY: {
      email: "demo.advisor@agromarket.com",
      password: "demo123"
    }
  };

  const account = demoAccounts[role];

  if (!account) {
    showToast("Invalid demo role", "error");
    return;
  }

  // Fill login form
  document.getElementById('login-email').value = account.email;
  document.getElementById('login-password').value = account.password;

  // Submit login
  document.getElementById('login-form').requestSubmit();
};