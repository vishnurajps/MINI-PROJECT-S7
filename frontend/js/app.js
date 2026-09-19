/**
 * AgroMarket Core Application Utilities (app.js)
 */

const API_BASE = "http://localhost:8085/api";

// Authentication state management
const Auth = {
  getUser: () => {
    try {
      return JSON.parse(localStorage.getItem('agromarket_user')) || null;
    } catch (e) {
      return null;
    }
  },

  getToken: () => localStorage.getItem('agromarket_token') || null,

  setUser: (user, token) => {
    localStorage.setItem('agromarket_user', JSON.stringify(user));
    if (token) localStorage.setItem('agromarket_token', token);
  },

  clear: () => {
    localStorage.removeItem('agromarket_user');
    localStorage.removeItem('agromarket_token');
  },

  isLoggedIn: () => !!localStorage.getItem('agromarket_user'),

  getRole: () => {
    const u = Auth.getUser();
    return u ? u.role : null;
  },

  requireRole: (expectedRole) => {
    const user = Auth.getUser();
    if (!user) {
      window.location.href = "auth.html";
      return false;
    }
    if (user.role !== expectedRole) {
      // Redirect to user's matching dashboard
      if (user.role === 'FARMER') window.location.href = "farmer-dashboard.html";
      else if (user.role === 'BUYER') window.location.href = "buyer-dashboard.html";
      else if (user.role === 'DELIVERY') window.location.href = "delivery-dashboard.html";
      else if (user.role === 'ADVISORY') window.location.href = "advisory-dashboard.html";
      else window.location.href = "index.html";
      return false;
    }
    return true;
  },

  logout: () => {
    Auth.clear();
    showToast("Logged out successfully", "info");
    setTimeout(() => {
      window.location.href = "auth.html";
    }, 600);
  }
};

// Notification Toasts
function showToast(message, type = "success") {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = "✓";
  if (type === "error") icon = "✕";
  if (type === "info") icon = "ℹ";

  toast.innerHTML = `<strong>${icon}</strong> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Helpers
function formatCurrency(amount) {
  if (amount === undefined || amount === null) return "₹0.00";
  return "₹" + Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

// Global initialization
// Global initialization
document.addEventListener('DOMContentLoaded', () => {

  // Force English language
  const savedLang = 'en';

  if (typeof applyLanguage === 'function') {
    applyLanguage(savedLang);
  }

  // Language selector
  const langSelect = document.getElementById('lang-select');

  if (langSelect) {
    langSelect.value = 'en';

    // Keep the application in English
    langSelect.addEventListener('change', () => {
      langSelect.value = 'en';
      applyLanguage('en');
    });
  }

  const navAuthArea = document.getElementById('nav-auth-area');

  if (!navAuthArea) return;

  const currentPage = window.location.pathname
    .split('/')
    .pop()
    .toLowerCase();

  const user = Auth.getUser();

  // Always show Login and Register on the Home page
  if (currentPage === 'index.html' || currentPage === '') {

    navAuthArea.innerHTML = `
      <a href="auth.html" class="btn btn-outline btn-sm">
        Login
      </a>

      <a href="auth.html" class="btn btn-primary btn-sm">
        Register
      </a>
    `;

    return;
  }

  // Show user information only on dashboard pages
  if (user) {

    let roleClass = 'role-' + user.role.toLowerCase();

    let dashboardUrl = 'index.html';

    if (user.role === 'FARMER') {
      dashboardUrl = 'farmer-dashboard.html';
    } else if (user.role === 'BUYER') {
      dashboardUrl = 'buyer-dashboard.html';
    } else if (user.role === 'DELIVERY') {
      dashboardUrl = 'delivery-dashboard.html';
    } else if (user.role === 'ADVISORY') {
      dashboardUrl = 'advisory-dashboard.html';
    }

    navAuthArea.innerHTML = `
      <div class="user-badge">

        <span class="role-pill ${roleClass}">
          ${user.role}
        </span>

        <span style="font-weight:600; font-size:0.9rem;">
          ${user.fullName}
        </span>

        <a href="${dashboardUrl}" class="btn btn-outline btn-sm">
          Dashboard
        </a>

        <button
          onclick="Auth.logout()"
          class="btn btn-danger btn-sm">
          Logout
        </button>

      </div>
    `;

  } else {

    // Show Login and Register for users who are not logged in
    navAuthArea.innerHTML = `
      <a href="auth.html" class="btn btn-outline btn-sm">
        Login
      </a>

      <a href="auth.html" class="btn btn-primary btn-sm">
        Register
      </a>
    `;

  }

  
});
function toggleDetails(id) {
    const details = document.getElementById(id);

    if (details) {
        details.classList.toggle("show");
    }
}
