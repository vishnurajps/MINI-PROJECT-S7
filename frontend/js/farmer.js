/**
 * Farmer Dashboard Controller (farmer.js)
 */

let earningsChartInstance = null;

document.addEventListener('DOMContentLoaded', async () => {
  if (!Auth.requireRole('FARMER')) return;

const farmer = Auth.getUser();

console.log("Complete farmer data:", farmer);
console.log("Farmer UPI ID:", farmer.upiId);

document.getElementById('farmer-name-display').textContent = farmer.fullName;
  document.getElementById('farmer-district-display').textContent = farmer.district;

  // Initialize tabs
  setupFarmerTabs();

  // Load weather
  loadWeatherWidget('farmer-weather-widget', farmer.district);

  // Load data
  await loadFarmerProducts(farmer.id);
  await loadFarmerOrders(farmer.id);
  await loadFarmerEarningsChart(farmer.id);
  await loadFarmerNotifications(farmer.id);
  await loadFarmerAdvisoryQueries(farmer.id);
  setupFarmerProfile(farmer);

  // Product Form Submissions
  setupProductForm(farmer);
  setupAdvisoryForm(farmer);
});

function setupFarmerTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      const targetContent = document.getElementById(targetId);
      if (targetContent) targetContent.classList.add('active');
    });
  });
}

// ---------------- PRODUCTS ----------------
async function loadFarmerProducts(farmerId) {
  try {
    const res = await fetch(`${API_BASE}/products/farmer/${farmerId}`);
    const products = await res.json();

    const container = document.getElementById('farmer-products-grid');
    const countBadge = document.getElementById('farmer-product-count');
    if (countBadge) countBadge.textContent = products.length;

    if (!products || products.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: white; border-radius: 12px; border: 1px dashed #cbd5e1;">
          <p style="color:#64748b; font-size:1.05rem; margin-bottom:1rem;">You haven't listed any farm produce yet.</p>
          <button onclick="openAddProductModal()" class="btn btn-primary">+ Add Your First Produce</button>
        </div>
      `;
      return;
    }

    container.innerHTML = products.map(p => `
      <div class="product-card">
        <div class="product-img-wrap">
          <img src="${p.imageUrl || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500'}" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500'">
          <span class="product-badge">${p.category}</span>
        </div>
        <div class="product-info">
          <div class="product-district">📍 ${p.district}</div>
          <h4 class="product-title">${p.name}</h4>
          <p class="product-desc">${p.description || ''}</p>
          
          <div class="product-price-row">
            <div>
              <div class="product-price">${formatCurrency(p.pricePerUnit)} <span style="font-size:0.8rem; font-weight:500; color:#64748b;">/ ${p.unit}</span></div>
              <div class="product-stock" style="color: ${p.quantityAvailable > 0 ? '#16a34a' : '#dc2626'}">
                Stock: <strong>${p.quantityAvailable} ${p.unit}</strong>
              </div>
            </div>
            <div style="display:flex; gap:0.4rem;">
              <button onclick='openEditProductModal(${JSON.stringify(p)})' class="btn btn-outline btn-sm">Edit</button>
              <button onclick="deleteProduct(${p.id})" class="btn btn-danger btn-sm">✕</button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  } catch (err) {
    console.error("Error loading products:", err);
  }
}

function setupProductForm(farmer) {
  const form = document.getElementById('product-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('prod-id').value;
    const payload = {
      farmerId: farmer.id,
      farmerName: farmer.fullName,
      district: farmer.district,
      name: document.getElementById('prod-name').value.trim(),
      category: document.getElementById('prod-category').value,
      pricePerUnit: parseFloat(document.getElementById('prod-price').value),
      unit: document.getElementById('prod-unit').value,
      quantityAvailable: parseFloat(document.getElementById('prod-qty').value),
      description: document.getElementById('prod-desc').value.trim(),
      imageUrl: document.getElementById('prod-image').value.trim()
    };

    try {
      const url = id ? `${API_BASE}/products/${id}` : `${API_BASE}/products`;
      const method = id ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showToast(id ? "Product updated successfully!" : "New product added to marketplace!", "success");
        closeModal('product-modal');
        loadFarmerProducts(farmer.id);
      } else {
        showToast("Failed to save product", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Server error saving product", "error");
    }
  });
}

window.openAddProductModal = function() {
  document.getElementById('product-form').reset();
  document.getElementById('prod-id').value = "";
  document.getElementById('product-modal-title').textContent = "Add Fresh Produce";
  openModal('product-modal');
};

window.openEditProductModal = function(product) {
  document.getElementById('prod-id').value = product.id;
  document.getElementById('prod-name').value = product.name;
  document.getElementById('prod-category').value = product.category;
  document.getElementById('prod-price').value = product.pricePerUnit;
  document.getElementById('prod-unit').value = product.unit;
  document.getElementById('prod-qty').value = product.quantityAvailable;
  document.getElementById('prod-desc').value = product.description || '';
  document.getElementById('prod-image').value = product.imageUrl || '';
  document.getElementById('product-modal-title').textContent = "Edit Produce Listing";
  openModal('product-modal');
};

window.deleteProduct = async function(id) {
  if (!confirm("Are you sure you want to remove this product from the marketplace?")) return;
  try {
    const res = await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
    if (res.ok) {
      showToast("Product deleted", "info");
      loadFarmerProducts(Auth.getUser().id);
    }
  } catch (err) {
    showToast("Failed to delete product", "error");
  }
};

// ---------------- ORDERS ----------------
async function loadFarmerOrders(farmerId) {
  try {
    const res = await fetch(`${API_BASE}/orders/farmer/${farmerId}`);
    const orders = await res.json();

    const tbody = document.getElementById('farmer-orders-tbody');
    const countBadge = document.getElementById('farmer-order-count');
    if (countBadge) countBadge.textContent = orders.length;

    if (!orders || orders.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:2rem; color:#94a3b8;">No orders received yet.</td></tr>`;
      return;
    }

    tbody.innerHTML = orders.map(o => {
      let statusBadge = getStatusBadge(o.orderStatus);
      let actionBtn = "";

      if (o.orderStatus === 'PLACED') {
        actionBtn = `
          <button onclick="acceptOrder(${o.id})" class="btn btn-success btn-sm">
            ✓ Accept & Confirm
          </button>
        `;
      } else {
        actionBtn = `<span style="font-size:0.85rem; color:#64748b;">${o.orderStatus.replace(/_/g, ' ')}</span>`;
      }

      const itemsSummary = o.items.map(i => `${i.productName} (${i.quantity} kg)`).join(', ');

      return `
        <tr>
          <td><strong>${o.orderNumber}</strong><br><small style="color:#94a3b8;">${formatDate(o.createdAt)}</small></td>
          <td>${o.buyerName}<br><small style="color:#64748b;">📞 ${o.buyerPhone}</small></td>
          <td>${itemsSummary}</td>
          <td>
            <strong>${formatCurrency(o.productTotal)}</strong><br>
            <span style="color:#16a34a; font-weight:700; font-size:0.85rem;">Your Share (70%): ${formatCurrency(o.farmerEarnings)}</span>
          </td>
          <td>${statusBadge}</td>
          <td>
            ${o.deliveryOtp ? `
              <span style="background:#eff6ff; color:#1e40af; font-family:monospace; font-weight:700; padding:0.2rem 0.5rem; border-radius:4px;">
                ${o.deliveryOtp}
              </span>
            ` : `<span style="color:#d97706; font-size:0.75rem; font-style:italic;">Pending Payment</span>`}
          </td>
          <td>
            ${o.deliveryAgentName ? `<strong>${o.deliveryAgentName}</strong><br><small>📞 ${o.deliveryAgentPhone || 'N/A'}</small>` : '<span style="color:#94a3b8;">Searching agent...</span>'}
          </td>
          <td>${actionBtn}</td>
        </tr>
      `;
    }).join('');
  } catch (err) {
    console.error("Error loading orders:", err);
  }
}

window.acceptOrder = async function(orderId) {
  const farmer = Auth.getUser();
  try {
    const res = await fetch(`${API_BASE}/orders/${orderId}/accept?farmerId=${farmer.id}`, {
      method: 'POST'
    });

    if (res.ok) {
      showToast("Order accepted! Stock has been automatically reduced.", "success");
      await loadFarmerOrders(farmer.id);
      await loadFarmerProducts(farmer.id); // Refresh inventory
      await loadFarmerEarningsChart(farmer.id);
    } else {
      const err = await res.json();
      showToast(err.error || "Failed to accept order", "error");
    }
  } catch (err) {
    showToast("Server error accepting order", "error");
  }
};

// ---------------- EARNINGS BAR CHART ----------------
async function loadFarmerEarningsChart(farmerId) {
  try {
    const res = await fetch(`${API_BASE}/orders/farmer-earnings-chart/${farmerId}`);
    const data = await res.json();

    const totalEl = document.getElementById('farmer-total-earnings');
    if (totalEl) totalEl.textContent = formatCurrency(data.totalEarnings);

    const chartCanvas = document.getElementById('farmerEarningsChart');
    if (!chartCanvas) return;

    if (earningsChartInstance) {
      earningsChartInstance.destroy();
    }

    const ctx = chartCanvas.getContext('2d');
    earningsChartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Farmer 70% Net Revenue (₹)',
          data: data.data,
          backgroundColor: 'rgba(46, 125, 50, 0.85)',
          borderColor: '#2e7d32',
          borderWidth: 1.5,
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: 'top' },
          tooltip: {
            callbacks: {
              label: (item) => ` Revenue: ₹${item.raw.toLocaleString('en-IN')}`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (val) => '₹' + val
            }
          }
        }
      }
    });
  } catch (err) {
    console.error("Error loading earnings chart:", err);
  }
}

// ---------------- ADVISORY ----------------
function setupAdvisoryForm(farmer) {
  const form = document.getElementById('farmer-advisory-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      userId: farmer.id,
      cropType: document.getElementById('adv-crop').value.trim(),
      subject: document.getElementById('adv-subject').value.trim(),
      question: document.getElementById('adv-question').value.trim()
    };

    try {
      const res = await fetch(`${API_BASE}/advisory/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showToast("Your query has been submitted to agricultural experts!", "success");
        form.reset();
        loadFarmerAdvisoryQueries(farmer.id);
      }
    } catch (err) {
      showToast("Failed to post advisory query", "error");
    }
  });
}

async function loadFarmerAdvisoryQueries(userId) {
  try {
    const res = await fetch(`${API_BASE}/advisory/user/${userId}`);
    const list = await res.json();
    const container = document.getElementById('farmer-queries-list');
    if (!container) return;

    if (!list || list.length === 0) {
      container.innerHTML = `<p style="color:#64748b; font-size:0.9rem;">You have not asked any advisory questions yet.</p>`;
      return;
    }

    container.innerHTML = list.map(q => `
      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:1.2rem; margin-bottom:1rem;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.5rem;">
          <h4 style="color:#1e293b;">${q.subject} <span style="font-size:0.8rem; background:#e2e8f0; padding:0.2rem 0.5rem; border-radius:4px;">${q.cropType || 'Crop'}</span></h4>
          <span class="badge ${q.status === 'ANSWERED' ? 'badge-delivered' : 'badge-placed'}">${q.status}</span>
        </div>
        <p style="color:#475569; font-size:0.9rem; margin-bottom:0.75rem;">${q.question}</p>
        ${q.reply ? `
          <div style="background:#f0fdf4; border-left:4px solid #16a34a; padding:0.85rem; border-radius:4px; font-size:0.88rem;">
            <strong>🌿 Expert Response from ${q.repliedByName || 'Agronomist'}:</strong><br>
            ${q.reply}
            <div style="font-size:0.75rem; color:#65a30d; margin-top:0.35rem;">Replied on ${formatDate(q.repliedAt)}</div>
          </div>
        ` : `
          <div style="color:#d97706; font-size:0.85rem; font-style:italic;">
            ⏳ Awaiting reply from certified agricultural advisor...
          </div>
        `}
      </div>
    `).join('');
  } catch (err) {
    console.error("Error loading queries:", err);
  }
}

// ---------------- PROFILE & UPI QR ----------------
function setupFarmerProfile(farmer) {

    const upiEl = document.getElementById('farmer-profile-upi');
    const qrImg = document.getElementById('farmer-profile-qr');

    const upiId = farmer.upiId ? farmer.upiId.trim() : '';

    console.log("Farmer UPI ID:", upiId);

    // Display UPI ID
    if (upiEl) {
        upiEl.textContent = upiId || 'Not registered';
    }

    // Generate QR code using UPI ID
    if (qrImg && upiId) {

        const upiPaymentUrl =
            `upi://pay?pa=${upiId}` +
            `&pn=${encodeURIComponent(farmer.fullName || 'Farmer')}` +
            `&cu=INR`;

        console.log("UPI Payment URL:", upiPaymentUrl);

        const qrApiUrl =
            `https://quickchart.io/qr?text=${encodeURIComponent(upiPaymentUrl)}&size=250`;

        console.log("QR Image URL:", qrApiUrl);

        qrImg.src = qrApiUrl;

        qrImg.onload = function () {
            console.log("QR code loaded successfully");
        };

        qrImg.onerror = function () {
            console.error("QR code failed to load");
            qrImg.alt = "QR code unavailable";
        };
    } else {
        console.error("UPI ID is missing");
        if (qrImg) {
            qrImg.alt = "UPI ID not registered";
        }
    }
}

// ---------------- NOTIFICATIONS ----------------
async function loadFarmerNotifications(userId) {
  try {
    const res = await fetch(`${API_BASE}/notifications/user/${userId}`);
    const notifs = await res.json();
    const container = document.getElementById('farmer-notifs-container');
    if (!container) return;

    if (!notifs || notifs.length === 0) {
      container.innerHTML = `<p style="color:#94a3b8; font-size:0.85rem;">No new notifications</p>`;
      return;
    }

    container.innerHTML = notifs.slice(0, 5).map(n => `
      <div style="padding:0.75rem; border-bottom:1px solid #f1f5f9; font-size:0.85rem;">
        <strong>${n.title}</strong>
        <p style="color:#64748b; margin-top:0.2rem;">${n.message}</p>
        <span style="font-size:0.75rem; color:#94a3b8;">${formatDate(n.createdAt)}</span>
      </div>
    `).join('');
  } catch (err) {
    console.error(err);
  }
}

function getStatusBadge(status) {
  switch (status) {
    case 'PLACED': return '<span class="badge badge-placed">Placed</span>';
    case 'ACCEPTED_BY_FARMER': return '<span class="badge badge-accepted">Accepted</span>';
    case 'PICKED_UP': return '<span class="badge badge-pickup">Picked Up</span>';
    case 'OUT_FOR_DELIVERY': return '<span class="badge badge-delivering">Out for Delivery</span>';
    case 'DELIVERED': return '<span class="badge badge-delivered">Delivered</span>';
    default: return `<span class="badge badge-placed">${status}</span>`;
  }
}

function openModal(id) {
  document.getElementById(id).classList.add('active');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}
