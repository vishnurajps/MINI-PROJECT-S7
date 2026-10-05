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
    const contents = document.querySelectorAll('.tab-content');

    function activateTab(targetId) {
        // Remove active state from all tabs
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });

        // Hide every tab content
        contents.forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none';
        });

        // Activate selected button
        const selectedTab = document.querySelector(
            `.tab-btn[data-tab="${targetId}"]`
        );

        if (selectedTab) {
            selectedTab.classList.add('active');
        }

        // Show only selected content
        const selectedContent = document.getElementById(targetId);

        if (selectedContent) {
            selectedContent.classList.add('active');
            selectedContent.style.display = 'block';
        }
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.getAttribute('data-tab');

            if (targetId) {
                activateTab(targetId);
            }
        });
    });

    // Show My Products when dashboard first opens
    activateTab('tab-products');
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
<p style="color:#64748b; font-size:1.05rem; margin-bottom:1rem;">
    ${t('no_products_listed')}
</p>
<button onclick="openAddProductModal()" class="btn btn-primary">
    ${t('add_first_produce')}
</button>
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
                ${t('stock')}: <strong>${p.quantityAvailable} ${p.unit}</strong>
              </div>
            </div>
            <div style="display:flex; gap:0.4rem;">
              <button onclick='openEditProductModal(${JSON.stringify(p)})' class="btn btn-outline btn-sm">${t('edit')}</button>
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
        showToast(
    id
        ? t('product_updated')
        : t('product_added'),
    "success"
);
        closeModal('product-modal');
        loadFarmerProducts(farmer.id);
      } else {
        showToast(t('failed_save_product'), "error");
      }
    } catch (err) {
      console.error(err);
      showToast(t('server_error_saving_product'), "error");
    }
  });
}

window.openAddProductModal = function() {
  document.getElementById('product-form').reset();
  document.getElementById('prod-id').value = "";
  document.getElementById('product-modal-title').textContent =
    t('add_fresh_produce');
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
  document.getElementById('product-modal-title').textContent =
    t('edit_produce_listing');
  openModal('product-modal');
};

window.deleteProduct = async function(id) {
  if (!confirm(t('remove_product_confirm'))) return;
  try {
    const res = await fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' });
    if (res.ok) {
      showToast(t('product_deleted'), "info");
      loadFarmerProducts(Auth.getUser().id);
    }
  } catch (err) {
    showToast(t('failed_delete_product'), "error");
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
      tbody.innerHTML = `
    <tr>
        <td colspan="8"
            style="text-align:center; padding:2rem; color:#94a3b8;">
            ${t('no_orders_received')}
        </td>
    </tr>
`;
      return;
    }

    tbody.innerHTML = orders.map(o => {
      let statusBadge = getStatusBadge(o.orderStatus);
      let actionBtn = "";

      if (o.orderStatus === 'PLACED') {
        actionBtn = `
          <button onclick="acceptOrder(${o.id})" class="btn btn-success btn-sm">
            ${t('accept_confirm')}
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
            <span style="color:#16a34a; font-weight:700; font-size:0.85rem;">${t('your_share_70')}: ${formatCurrency(o.farmerEarnings)}</span>
          </td>
          <td>${statusBadge}</td>
          <td>
            ${o.deliveryOtp ? `
              <span style="background:#eff6ff; color:#1e40af; font-family:monospace; font-weight:700; padding:0.2rem 0.5rem; border-radius:4px;">
                ${o.deliveryOtp}
              </span>
            ` : `<span style="color:#d97706; font-size:0.75rem; font-style:italic;">${t('pending_payment')}</span>`}
          </td>
          <td>
            ${o.deliveryAgentName ? `<strong>${o.deliveryAgentName}</strong><br><small>📞 ${o.deliveryAgentPhone || 'N/A'}</small>` : `<span style="color:#94a3b8;">${t('searching_agent')}</span>`}
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
      showToast(t('order_accepted_stock_reduced'), "success");
      await loadFarmerOrders(farmer.id);
      await loadFarmerProducts(farmer.id); // Refresh inventory
      await loadFarmerEarningsChart(farmer.id);
    } else {
      const err = await res.json();
      showToast(err.error || t('failed_accept_order'), "error");
    }
  } catch (err) {
    showToast(t('server_error_accepting_order'), "error");
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
        showToast(t('your_query_submitted'), "success");
        form.reset();
        loadFarmerAdvisoryQueries(farmer.id);
      }
    } catch (err) {
      showToast(t('failed_post_advisory'), "error");
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
      container.innerHTML = `<p style="color:#64748b; font-size:0.9rem;">${t('no_advisory_questions')}</p>`;
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

    const qrContainer = document.getElementById('farmer-profile-qr');
    const upiDisplay = document.getElementById('farmer-profile-upi');

    // -----------------------------
    // Display UPI ID
    // -----------------------------
    if (upiDisplay) {
        upiDisplay.textContent =
            farmer.upiId || t('not_registered');
    }

    // -----------------------------
    // Generate QR Code
    // -----------------------------
    if (qrContainer) {

        // Clear previous QR
        qrContainer.innerHTML = '';

        if (farmer.upiId) {

            const upiUri =
                `upi://pay?pa=${encodeURIComponent(farmer.upiId)}` +
                `&pn=${encodeURIComponent(farmer.fullName || 'Farmer')}` +
                `&cu=INR`;

            if (typeof QRCode !== 'undefined') {

                new QRCode(qrContainer, {
                    text: upiUri,
                    width: 250,
                    height: 250,
                    correctLevel: QRCode.CorrectLevel.H
                });

            } else {

                console.error('QRCode library not loaded.');

                qrContainer.innerHTML = `
                    <p style="color:#dc2626; text-align:center;">
                        ${t('qr_code_unavailable')}
                    </p>
                `;
            }

        } else {

            qrContainer.innerHTML = `
                <p style="color:#94a3b8; text-align:center;">
                    ${t('not_registered')}
                </p>
            `;
        }
    }
}
// =========================================================
// FARMER UPI EDIT
// =========================================================

window.openUpiEdit = function () {

    const farmer = Auth.getUser();

    const input = document.getElementById('farmer-upi-input');
    const form = document.getElementById('upi-edit-form');

    if (!input || !form) return;

    input.value = farmer.upiId || '';

    form.style.display = 'block';

    input.focus();
};


window.cancelUpiEdit = function () {

    const form = document.getElementById('upi-edit-form');

    if (form) {
        form.style.display = 'none';
    }
};


window.saveFarmerUpi = async function () {

    const farmer = Auth.getUser();

    const input = document.getElementById('farmer-upi-input');

    if (!input || !farmer) {
        return;
    }

    const newUpiId = input.value.trim();


    // Check empty
    if (!newUpiId) {

        showToast(
            'Please enter your UPI ID',
            'error'
        );

        input.focus();

        return;
    }


    // Basic UPI format validation
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+$/.test(newUpiId)) {

        showToast(
            'Please enter a valid UPI ID',
            'error'
        );

        input.focus();

        return;
    }


    try {

        const response = await fetch(
            `${API_BASE}/auth/profile/${farmer.id}`,
            {
                method: 'PUT',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    upiId: newUpiId
                })
            }
        );


        if (!response.ok) {

            const errorText = await response.text();

            console.error(
                'UPI update failed:',
                errorText
            );

            showToast(
                'Failed to update UPI ID',
                'error'
            );

            return;
        }


        // Get updated farmer from backend
        const updatedFarmer = await response.json();


        // Update local user
        const currentUser = Auth.getUser();

        currentUser.upiId =
            updatedFarmer.upiId;

        currentUser.qrCodeUrl =
            updatedFarmer.qrCodeUrl;


        // Save updated user locally
        localStorage.setItem(
            'agromarket_user',
            JSON.stringify(currentUser)
        );


        // Refresh profile + QR
        setupFarmerProfile(currentUser);


        // Close edit form
        const editForm =
            document.getElementById('upi-edit-form');

        if (editForm) {
            editForm.style.display = 'none';
        }


        showToast(
            'UPI ID updated successfully',
            'success'
        );


    } catch (error) {

        console.error(
            'UPI update error:',
            error
        );

        showToast(
            'Server error while updating UPI ID',
            'error'
        );
    }
};

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

// Re-render dynamic Farmer Dashboard content when language changes
document.addEventListener('languageChanged', async () => {
    const farmer = Auth.getUser();

    if (!farmer || farmer.role !== 'FARMER') return;

    await loadFarmerProducts(farmer.id);
    await loadFarmerOrders(farmer.id);
    await loadFarmerAdvisoryQueries(farmer.id);
    await loadFarmerNotifications(farmer.id);
    await loadFarmerEarningsChart(farmer.id);

    // Update modal title if it is currently visible
    const modalTitle = document.getElementById('product-modal-title');

    if (modalTitle && document.getElementById('product-modal')?.classList.contains('active')) {
        const productId = document.getElementById('prod-id')?.value;

        modalTitle.textContent = productId
            ? t('edit_produce_listing')
            : t('add_fresh_produce');
    }
});