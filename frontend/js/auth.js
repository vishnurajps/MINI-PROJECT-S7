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

    sessionStorage.setItem(
        "ifmap_welcome",
        JSON.stringify({
            role: data.user.role,
            name: data.user.fullName
        })
    );

    redirectToRoleDashboard(data.user.role);

}else {
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

    sessionStorage.setItem(
        "ifmap_welcome",
        JSON.stringify({
            role: data.user.role,
            name: data.user.fullName
        })
    );

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
  if (role === 'FARMER') {
    window.location.href = "farmer-dashboard.html";
  }
  else if (role === 'BUYER') {
    window.location.href = "buyer-dashboard.html";
  }
  else if (role === 'DELIVERY') {
    window.location.href = "delivery-dashboard.html";
  }
  else if (role === 'ADVISORY') {
    window.location.href = "advisory-dashboard.html";
  }
  else {
    window.location.href = "index.html";
  }
}

const demoAccounts = {
    FARMER: {
        email: "demo.farmer@gmail.com",
        password: "Demo@123"
    },

    BUYER: {
        email: "demo.buyer@gmail.com",
        password: "Demo@123"
    },

    DELIVERY: {
        email: "demo.delivery@gmail.com",
        password: "Demo@123"
    },

    ADVISORY: {
        email: "demo.advisor@bitsathy.ac.in",
        password: "Demo@123"
    }
};

// =========================================================
// QUICK DEMO LOGIN
// =========================================================

window.quickLogin = function(role) {

    const account = demoAccounts[role];

    if (!account) {
        showToast("Invalid demo role", "error");
        return;
    }

    // Fill login form
    const emailInput = document.getElementById("login-email");
    const passwordInput = document.getElementById("login-password");

    if (!emailInput || !passwordInput) {
        console.error("Login form fields not found.");
        return;
    }

    emailInput.value = account.email;
    passwordInput.value = account.password;

    // Trigger input events so validation recognizes the values
    emailInput.dispatchEvent(new Event("input", { bubbles: true }));
    passwordInput.dispatchEvent(new Event("input", { bubbles: true }));

    // Submit login form
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.requestSubmit();
    } else {
        console.error("Login form not found.");
    }
};

function showWelcomeSplash(user) {

    const splash = document.getElementById("welcome-splash");
    const roleElement = document.getElementById("welcome-role");

    if (!splash || !roleElement) {
        return;
    }

    let roleKey = "buyer";

    switch (user.role) {

        case "FARMER":
            roleKey = "farmer";
            break;

        case "BUYER":
            roleKey = "buyer";
            break;

        case "ADVISORY":
            roleKey = "advisor";
            break;

        case "DELIVERY":
            roleKey = "delivery_boy";
            break;

        default:
            roleKey = "buyer";
    }

    roleElement.textContent =
        typeof t === "function"
            ? t(roleKey)
            : roleKey;

    splash.classList.add("show");

    return new Promise(resolve => {

        setTimeout(() => {
            splash.classList.remove("show");
            resolve();
        }, 2000);

    });
}

// =========================================================
// PASSWORD SHOW / HIDE + EMAIL & PASSWORD VALIDATION
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    // -----------------------------------------------------
    // 1. Add show/hide eye button to ALL password fields
    // -----------------------------------------------------
    document.querySelectorAll('input[type="password"]').forEach((input) => {

        // Avoid adding the eye button twice
        if (input.parentElement.classList.contains("password-wrapper")) {
            return;
        }

        const wrapper = document.createElement("div");
        wrapper.className = "password-wrapper";

        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);

        const toggleButton = document.createElement("button");

        toggleButton.type = "button";
        toggleButton.className = "password-toggle";
        toggleButton.innerHTML = "👁️";
        toggleButton.setAttribute("aria-label", "Show password");

        toggleButton.addEventListener("click", () => {

            if (input.type === "password") {
                input.type = "text";
                toggleButton.innerHTML = "🙈";
                toggleButton.setAttribute("aria-label", "Hide password");
            } else {
                input.type = "password";
                toggleButton.innerHTML = "👁️";
                toggleButton.setAttribute("aria-label", "Show password");
            }

        });

        wrapper.appendChild(toggleButton);
    });


    // -----------------------------------------------------
    // 2. Email validation
    // Allowed:
    // example@gmail.com
    // example@bitsathy.ac.in
    // -----------------------------------------------------
    document.querySelectorAll('input[type="email"]').forEach((emailInput) => {

        emailInput.setAttribute(
            "pattern",
            "[A-Za-z0-9._%+-]+@(gmail\\.com|bitsathy\\.ac\\.in)"
        );

        emailInput.setAttribute(
            "title",
            "Email must end with @gmail.com or @bitsathy.ac.in"
        );

        emailInput.addEventListener("input", () => {

            const email = emailInput.value.trim();

            if (email === "") {
                emailInput.setCustomValidity("");
                return;
            }

            const validEmail =
                /^[A-Za-z0-9._%+-]+@(gmail\.com|bitsathy\.ac\.in)$/i.test(email);

            if (!validEmail) {
                emailInput.setCustomValidity(
                    "Only @gmail.com or @bitsathy.ac.in email addresses are allowed."
                );
            } else {
                emailInput.setCustomValidity("");
            }
        });
    });


    // -----------------------------------------------------
    // 3. Password validation
    // -----------------------------------------------------
    document.querySelectorAll('input[type="password"]').forEach((passwordInput) => {

        passwordInput.setAttribute(
            "pattern",
            "(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}"
        );

        passwordInput.setAttribute(
            "title",
            "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one symbol."
        );

        passwordInput.addEventListener("input", () => {

            const password = passwordInput.value;

            if (password === "") {
                passwordInput.setCustomValidity("");
                return;
            }

            const validPassword =
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/.test(password);

            if (!validPassword) {
                passwordInput.setCustomValidity(
                    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one symbol."
                );
            } else {
                passwordInput.setCustomValidity("");
            }
        });
    });

});

// =========================================================
// PASSWORD SHOW / HIDE
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll('input[type="password"]').forEach((input) => {

        // Prevent duplicate eye icons
        if (input.parentElement.classList.contains("password-wrapper")) {
            return;
        }

        // Create wrapper
        const wrapper = document.createElement("div");
        wrapper.className = "password-wrapper";

        // Put wrapper around password input
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);

        // Create eye button
        const toggleButton = document.createElement("button");

        toggleButton.type = "button";
        toggleButton.className = "password-toggle";
        toggleButton.innerHTML = "👁️";
        toggleButton.setAttribute("aria-label", "Show password");

        // Show / hide password
        toggleButton.addEventListener("click", () => {

            if (input.type === "password") {
                input.type = "text";
                toggleButton.innerHTML = "🙈";
                toggleButton.setAttribute("aria-label", "Hide password");
            } else {
                input.type = "password";
                toggleButton.innerHTML = "👁️";
                toggleButton.setAttribute("aria-label", "Show password");
            }

        });

        wrapper.appendChild(toggleButton);
    });

});

// =========================================================
// EMAIL VALIDATION
// Only @gmail.com and @bitsathy.ac.in are allowed
// =========================================================

document.querySelectorAll('input[type="email"]').forEach((emailInput) => {

    emailInput.addEventListener("input", () => {

        const email = emailInput.value.trim();

        // Empty field - let required validation handle it
        if (email === "") {
            emailInput.setCustomValidity("");
            return;
        }

        const validEmail =
            /^[A-Za-z0-9._%+-]+@(gmail\.com|bitsathy\.ac\.in)$/i.test(email);

        if (!validEmail) {

            emailInput.setCustomValidity(
                "Only @gmail.com or @bitsathy.ac.in email addresses are allowed."
            );

        } else {

            emailInput.setCustomValidity("");
        }
    });

});

// =========================================================
// PASSWORD VALIDATION
// Minimum 8 characters
// 1 uppercase + 1 lowercase + 1 number + 1 symbol
// =========================================================

document.querySelectorAll('input[type="password"]').forEach((passwordInput) => {

    passwordInput.addEventListener("input", () => {

        const password = passwordInput.value;

        // Empty field - let required validation handle it
        if (password === "") {
            passwordInput.setCustomValidity("");
            return;
        }

        const validPassword =
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/.test(password);

        if (!validPassword) {

            passwordInput.setCustomValidity(
                "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one symbol."
            );

        } else {

            passwordInput.setCustomValidity("");
        }
    });

});

// =========================================================
// INTERACTIVE FARMER LOGIN CHARACTER
// Eyes follow cursor + close eyes on password
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    const farmer = document.getElementById("login-farmer-character");
    const passwordInput = document.getElementById("login-password");

    if (!farmer) return;

    const pupils = farmer.querySelectorAll(".eye-pupil");

    // -----------------------------------------------------
    // Eyes follow mouse cursor
    // -----------------------------------------------------

    document.addEventListener("mousemove", (event) => {

        const farmerRect = farmer.getBoundingClientRect();

        const farmerCenterX =
            farmerRect.left + farmerRect.width / 2;

        const farmerCenterY =
            farmerRect.top + 85;

        const deltaX = event.clientX - farmerCenterX;
        const deltaY = event.clientY - farmerCenterY;

        const angle = Math.atan2(deltaY, deltaX);

        const distance = Math.min(
            5,
            Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 80
        );

        const moveX = Math.cos(angle) * distance;
        const moveY = Math.sin(angle) * distance;

        pupils.forEach((pupil) => {

            pupil.style.transform =
                `translate(${moveX}px, ${moveY}px)`;

        });

    });

    // -----------------------------------------------------
    // Close farmer's eyes when password is being entered
    // -----------------------------------------------------

    if (passwordInput) {

        passwordInput.addEventListener("focus", () => {

            farmer.classList.add("password-active");

        });

        passwordInput.addEventListener("blur", () => {

            farmer.classList.remove("password-active");

        });

    }

});

// =========================================================
// FARMER MOUSE INTERACTION
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    const farmer = document.getElementById("login-farmer-character");

    if (!farmer) return;

    document.addEventListener("mousemove", (event) => {

        const rect = farmer.getBoundingClientRect();

        const farmerCenterX = rect.left + rect.width / 2;
        const farmerCenterY = rect.top + rect.height / 2;

        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const distanceX = mouseX - farmerCenterX;
        const distanceY = mouseY - farmerCenterY;

        // Limit the movement
        const moveX = Math.max(
            -8,
            Math.min(8, distanceX / 80)
        );

        const moveY = Math.max(
            -5,
            Math.min(5, distanceY / 100)
        );

        farmer.style.setProperty("--mouse-x", `${moveX}px`);
        farmer.style.setProperty("--mouse-y", `${moveY}px`);
    });

});

// =========================================================
// FARMER EYES FOLLOW MOUSE
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    const farmer = document.getElementById("login-farmer-character");

    if (!farmer) return;

    const pupils = farmer.querySelectorAll(".farmer-pupil");

    document.addEventListener("mousemove", (event) => {

        const rect = farmer.getBoundingClientRect();

        const faceX = rect.left + rect.width * 0.50;
        const faceY = rect.top + rect.height * 0.25;

        const dx = event.clientX - faceX;
        const dy = event.clientY - faceY;

        const maxX = 3;
        const maxY = 3;

        const eyeX = Math.max(
            -maxX,
            Math.min(maxX, dx / 100)
        );

        const eyeY = Math.max(
            -maxY,
            Math.min(maxY, dy / 100)
        );

        pupils.forEach((pupil) => {
            pupil.style.setProperty("--eye-x", `${eyeX}px`);
            pupil.style.setProperty("--eye-y", `${eyeY}px`);
        });

    });

});

// =========================================================
// FARMER CLOSES EYES ON PASSWORD FOCUS
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    const farmer = document.getElementById("login-farmer-character");
    const passwordInput = document.getElementById("login-password");

    if (!farmer || !passwordInput) return;

    passwordInput.addEventListener("focus", () => {
        farmer.classList.add("password-active");
    });

    passwordInput.addEventListener("blur", () => {
        farmer.classList.remove("password-active");
    });

});

