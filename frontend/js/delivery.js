/**
 * Delivery Agent Dashboard Controller (delivery.js)
 */

let activeOrderIdForOtp = null;

document.addEventListener('DOMContentLoaded', async () => {
  if (!Auth.requireRole('DELIVERY')) return;

  const agent = Auth.getUser();
  document.getElementById('agent-name-display').textContent = agent.fullName;
  document.getElementById('agent-district-display').textContent = agent.district;

  setupDeliveryTabs();
  setupAgentProfile(agent);

  await loadDeliveryOrders(agent);
  await loadDeliveryEarningsSummary(agent.id);

  // OTP Verification Form
  const otpForm = document.getElementById('otp-verify-form');
  if (otpForm) {
    otpForm.addEventListener('submit', handleOtpVerification);
  }
});

function setupDeliveryTabs() {
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

function setupAgentProfile(agent) {
  const bankAccEl = document.getElementById('agent-bank-acc');
  const ifscEl = document.getElementById('agent-bank-ifsc');
  const bankNameEl = document.getElementById('agent-bank-name');
  const vehicleEl = document.getElementById('agent-vehicle');

  if (bankAccEl) bankAccEl.textContent = agent.bankAccountNo || "Not provided";
  if (ifscEl) ifscEl.textContent = agent.bankIfsc || "Not provided";
  if (bankNameEl) bankNameEl.textContent = agent.bankName || "State Bank of India";
  if (vehicleEl) vehicleEl.textContent = `${agent.vehicleType || 'Motorcycle'} (${agent.vehicleNumber || 'Registered'})`;
}

// ---------------- ORDERS MANAGEMENT ----------------
async function loadDeliveryOrders(agent) {
  try {
    // 1. Load active/assigned orders for this agent
    const myOrdersRes = await fetch(`${API_BASE}/orders/delivery/${agent.id}`);
    const myOrders = await myOrdersRes.json();

    // 2. Load available orders in district waiting for pickup
    const availRes = await fetch(`${API_BASE}/orders/available-deliveries?district=${encodeURIComponent(agent.district)}`);
    const availableOrders = await availRes.json();

    renderActiveDeliveries(myOrders.filter(o => o.orderStatus !== 'DELIVERED' && o.orderStatus !== 'CANCELLED'));
    renderCompletedDeliveries(myOrders.filter(o => o.orderStatus === 'DELIVERED'));
    renderAvailablePickups(availableOrders.filter(o => !o.deliveryAgentId || o.deliveryAgentId === agent.id));

    // Update metrics
    document.getElementById('active-deliveries-count').textContent = myOrders.filter(o => o.orderStatus !== 'DELIVERED').length;
    document.getElementById('completed-deliveries-count').textContent = myOrders.filter(o => o.orderStatus === 'DELIVERED').length;
  } catch (err) {
    console.error("Error loading delivery orders:", err);
  }
}

function renderActiveDeliveries(orders) {
  const container = document.getElementById('active-orders-container');
  if (!container) return;

  if (!orders || orders.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2.5rem; background: white; border-radius: 12px; border: 1px dashed #cbd5e1;">
        <p style="color:#64748b;">No active delivery orders currently in transit.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = orders.map(o => {
    const farmerMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.farmerMapsQuery || o.farmerDistrict + ', India')}`;
    const buyerMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(o.buyerMapsQuery || o.deliveryAddress + ', India')}`;

    let actionButtons = "";
    if (o.orderStatus === 'ACCEPTED_BY_FARMER') {
      actionButtons = `
        <button onclick="updateStatus(${o.id}, 'PICKED_UP')" class="btn btn-primary btn-sm">
          📦 Mark Picked Up from Farmer
        </button>
      `;
    } else if (o.orderStatus === 'PICKED_UP') {
      actionButtons = `
        <button onclick="updateStatus(${o.id}, 'OUT_FOR_DELIVERY')" class="btn btn-primary btn-sm">
          🛵 Out for Delivery to Buyer
        </button>
      `;
    } else if (o.orderStatus === 'OUT_FOR_DELIVERY') {
      actionButtons = `
        <button onclick="openOtpModal(${o.id}, '${o.orderNumber}', '${o.paymentMethod}', '${o.paymentStatus}', '${o.farmerUpiId}', '${o.farmerQrCodeUrl}', ${o.grandTotal}, ${o.farmerEarnings}, ${o.deliveryEarnings})" class="btn btn-success">
          🔑 Verify Buyer OTP & Deliver
        </button>
      `;
    }

    return `
      <div class="panel" style="margin-bottom: 1.5rem;">
        <div class="panel-header">
          <div>
            <h3>Order #${o.orderNumber}</h3>
            <span style="font-size:0.85rem; color:#64748b;">Grand Total: ${formatCurrency(o.grandTotal)} • Payment: <strong>${o.paymentMethod}</strong></span>
          </div>
          <div>${getStatusBadge(o.orderStatus)}</div>
        </div>
        <div class="panel-body">
          <div class="route-card">
            <div class="route-stop">
              <div class="stop-marker marker-pickup">1</div>
              <div class="stop-details" style="flex-grow:1;">
                <h5>Pickup from Farmer: ${o.farmerName}</h5>
                <p>📍 ${o.farmerMapsQuery || o.farmerDistrict}</p>
                <p>📞 Farmer Phone: ${o.farmerPhone || 'N/A'}</p>
                <a href="${farmerMapsUrl}" target="_blank" class="btn btn-outline btn-sm" style="margin-top:0.4rem;">
                  🗺️ Open Farmer Location in Google Maps
                </a>
              </div>
            </div>

            <div style="border-left: 2px dashed #cbd5e1; height: 20px; margin-left: 13px;"></div>

            <div class="route-stop">
              <div class="stop-marker marker-dropoff">2</div>
              <div class="stop-details" style="flex-grow:1;">
                <h5>Deliver to Buyer: ${o.buyerName}</h5>
                <p>📍 ${o.deliveryAddress}</p>
                <p>📞 Buyer Phone: ${o.buyerPhone}</p>
                <a href="${buyerMapsUrl}" target="_blank" class="btn btn-outline btn-sm" style="margin-top:0.4rem;">
                  🗺️ Open Buyer Location in Google Maps
                </a>
              </div>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; background:#f0fdf4; padding:0.85rem 1.25rem; border-radius:8px; margin-bottom:1rem;">
            <div>
              <span style="color:#166534; font-weight:700;">Your 30% Payout for this order:</span>
              <div style="font-size:1.25rem; font-weight:800; color:#15803d;">${formatCurrency(o.deliveryEarnings)}</div>
            </div>
            <div style="text-align:right;">
              <span style="color:#64748b; font-size:0.825rem;">Farmer 70% Share:</span>
              <div style="font-weight:700; color:#334155;">${formatCurrency(o.farmerEarnings)}</div>
            </div>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:0.75rem;">
            ${actionButtons}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderAvailablePickups(orders) {
  const container = document.getElementById('available-orders-container');
  if (!container) return;

  if (!orders || orders.length === 0) {
    container.innerHTML = `<p style="text-align:center; padding:2rem; color:#94a3b8;">No new orders currently awaiting pickup in your district.</p>`;
    return;
  }

  container.innerHTML = orders.map(o => `
    <div style="background:white; border:1px solid #e2e8f0; border-radius:8px; padding:1.2rem; margin-bottom:1rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
      <div>
        <h4 style="color:#1e293b; margin-bottom:0.25rem;">Order #${o.orderNumber}</h4>
        <p style="font-size:0.85rem; color:#64748b;">
          From: <strong>${o.farmerName}</strong> (📍 ${o.farmerDistrict}) &rarr; To: <strong>${o.buyerName}</strong>
        </p>
        <span style="font-size:0.85rem; color:#16a34a; font-weight:700;">
          30% Commission: ${formatCurrency(o.deliveryEarnings)}
        </span>
      </div>
      <div>
        <button onclick="claimAndPickup(${o.id})" class="btn btn-primary btn-sm">
          Claim & Pick Up Order
        </button>
      </div>
    </div>
  `).join('');
}

function renderCompletedDeliveries(orders) {
  const tbody = document.getElementById('completed-orders-tbody');
  if (!tbody) return;

  if (!orders || orders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2rem; color:#94a3b8;">No completed deliveries recorded yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = orders.map(o => `
    <tr>
      <td><strong>${o.orderNumber}</strong></td>
      <td>${o.farmerName} &rarr; ${o.buyerName}</td>
      <td>${formatCurrency(o.grandTotal)}</td>
      <td><strong style="color:#16a34a;">${formatCurrency(o.deliveryEarnings)}</strong> (30%)</td>
      <td><span class="badge badge-delivered">Delivered</span></td>
      <td><small style="color:#64748b;">${formatDate(o.deliveredAt || o.createdAt)}</small></td>
    </tr>
  `).join('');
}

window.updateStatus = async function(orderId, status) {
  const agent = Auth.getUser();
  try {
    const res = await fetch(`${API_BASE}/orders/${orderId}/delivery-status?agentId=${agent.id}&status=${status}`, {
      method: 'POST'
    });

    if (res.ok) {
      showToast(`Order status updated to ${status.replace('_', ' ')}!`, "success");
      await loadDeliveryOrders(agent);
    } else {
      showToast("Failed to update status", "error");
    }
  } catch (err) {
    showToast("Server error updating status", "error");
  }
};

window.claimAndPickup = async function(orderId) {
  await updateStatus(orderId, 'PICKED_UP');
};

window.openOtpModal = function(orderId, orderNum, payMethod, payStatus, farmerUpi, qrUrl, total, farmerShare, deliveryShare) {
  activeOrderIdForOtp = orderId;
  document.getElementById('otp-modal-order-num').textContent = orderNum;
  document.getElementById('otp-input').value = "";

  const codNotice = document.getElementById('otp-cod-notice');
  const codFarmerQr = document.getElementById('cod-farmer-qr');

  if (payMethod === 'COD' && payStatus === 'PENDING') {
    codNotice.style.display = 'block';
    document.getElementById('cod-amount-to-collect').textContent = formatCurrency(total);
    document.getElementById('cod-farmer-share').textContent = formatCurrency(farmerShare);
    document.getElementById('cod-agent-share').textContent = formatCurrency(deliveryShare);

    // Provide farmer QR for cashless COD if buyer prefers scanning farmer's UPI
    if (codFarmerQr) {
      const upiUri = `upi://pay?pa=${encodeURIComponent(farmerUpi || 'farmer@upi')}&cu=INR`;
      codFarmerQr.src = qrUrl || `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUri)}`;
    }
  } else {
    codNotice.style.display = 'none';
  }

  openModal('otp-verification-modal');
};

window.collectCodPayment = async function() {
  try {
    const res = await fetch(`${API_BASE}/orders/${activeOrderIdForOtp}/confirm-payment?paymentMethod=COD`, {
      method: 'POST'
    });
    if (res.ok) {
      const updated = await res.json();
      showToast("Payment marked received! Delivery OTP generated on buyer's phone.", "success");
      document.getElementById('otp-cod-notice').style.display = 'none';
      loadDeliveryOrders(Auth.getUser());
    } else {
      showToast("Failed to confirm payment", "error");
    }
  } catch (err) {
    showToast("Server error confirming payment", "error");
  }
};

async function handleOtpVerification(e) {
  e.preventDefault();
  const enteredOtp = document.getElementById('otp-input').value.trim();
  const agent = Auth.getUser();

  if (!enteredOtp || enteredOtp.length !== 6) {
    showToast("Please enter a valid 6-digit OTP given by the buyer", "error");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/orders/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: activeOrderIdForOtp,
        deliveryAgentId: agent.id,
        enteredOtp: enteredOtp
      })
    });

    if (res.ok) {
      const order = await res.json();
      closeModal('otp-verification-modal');
      showToast(`OTP Verified! Order #${order.orderNumber} successfully marked DELIVERED across all dashboards!`, "success");

      await loadDeliveryOrders(agent);
      await loadDeliveryEarningsSummary(agent.id);
    } else {
      const err = await res.json();
      showToast(err.error || "Incorrect OTP! Please verify with the buyer.", "error");
    }
  } catch (err) {
    console.error(err);
    showToast("Server error verifying OTP", "error");
  }
}

// ---------------- EARNINGS SUMMARY ----------------
async function loadDeliveryEarningsSummary(agentId) {
  try {
    const res = await fetch(`${API_BASE}/orders/delivery-earnings-summary/${agentId}`);
    const data = await res.json();

    const totalEl = document.getElementById('agent-total-earnings');
    if (totalEl) totalEl.textContent = formatCurrency(data.totalEarnings);
  } catch (err) {
    console.error("Error loading delivery earnings:", err);
  }
}

function getStatusBadge(status) {
  switch (status) {
    case 'PLACED': return '<span class="badge badge-placed">Placed</span>';
    case 'ACCEPTED_BY_FARMER': return '<span class="badge badge-accepted">Confirmed by Farmer</span>';
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
