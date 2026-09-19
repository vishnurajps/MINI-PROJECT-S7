/**
 * Buyer Marketplace Controller (buyer.js)
 */

let cart = []; // [{ product, quantity }]
let loadedProducts = [];

document.addEventListener('DOMContentLoaded', async () => {
  if (!Auth.requireRole('BUYER')) return;

  const buyer = Auth.getUser();
  document.getElementById('buyer-name-display').textContent = buyer.fullName;
  document.getElementById('buyer-district-display').textContent = buyer.district;

  // Set default district filter to buyer's registered district
  const distSelect = document.getElementById('district-filter');
  if (distSelect) {
    distSelect.value = buyer.district || "";
    distSelect.addEventListener('change', () => loadBuyerProducts());
  }

  const catSelect = document.getElementById('category-filter');
  if (catSelect) {
    catSelect.addEventListener('change', () => loadBuyerProducts());
  }

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => filterLocalProducts());
  }

  setupBuyerTabs();
  await loadBuyerProducts();
  await loadBuyerOrders(buyer.id);
  setupBuyerAdvisory(buyer);

  // Cart button trigger
  document.getElementById('cart-btn').addEventListener('click', openCartModal);
});

function setupBuyerTabs() {
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

// ---------------- MARKETPLACE BROWSING ----------------
async function loadBuyerProducts() {
  const district = document.getElementById('district-filter').value;
  const category = document.getElementById('category-filter').value;

  try {
    let url = `${API_BASE}/products?`;
    if (district) url += `district=${encodeURIComponent(district)}&`;
    if (category) url += `category=${encodeURIComponent(category)}`;

    const res = await fetch(url);
    loadedProducts = await res.json();
    renderProducts(loadedProducts);
  } catch (err) {
    console.error("Error loading products:", err);
  }
}

function filterLocalProducts() {
  const term = document.getElementById('search-input').value.toLowerCase().trim();
  if (!term) {
    renderProducts(loadedProducts);
    return;
  }
  const filtered = loadedProducts.filter(p =>
    p.name.toLowerCase().includes(term) ||
    p.category.toLowerCase().includes(term) ||
    p.farmerName.toLowerCase().includes(term)
  );
  renderProducts(filtered);
}

function renderProducts(products) {
  const grid = document.getElementById('buyer-product-grid');
  if (!products || products.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: white; border-radius: 12px;">
        <p style="color:#64748b; font-size:1.05rem;">No farm produce found for the selected filter.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = products.map(p => `
    <div class="product-card">
      <div class="product-img-wrap">
        <img src="${p.imageUrl || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500'}" alt="${p.name}" onerror="this.src='https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500'">
        <span class="product-badge">${p.category}</span>
      </div>
      <div class="product-info">
        <div class="product-district">📍 ${p.district} • 👨‍🌾 ${p.farmerName}</div>
        <h4 class="product-title">${p.name}</h4>
        <p class="product-desc">${p.description || 'Farm-fresh harvest'}</p>
        
        <div class="product-price-row">
          <div>
            <div class="product-price">${formatCurrency(p.pricePerUnit)} <span style="font-size:0.8rem; color:#64748b; font-weight:500;">/ ${p.unit}</span></div>
            <div class="product-stock" style="color: ${p.quantityAvailable > 0 ? '#16a34a' : '#dc2626'}; font-size:0.8rem;">
              ${p.quantityAvailable > 0 ? `In Stock: ${p.quantityAvailable} ${p.unit}` : 'Out of Stock'}
            </div>
          </div>
          
          <div>
            ${p.quantityAvailable > 0 ? `
              <div style="display:flex; align-items:center; gap:0.4rem;">
                <input type="number" id="qty-${p.id}" value="1" min="1" max="${p.quantityAvailable}" step="0.5" style="width:55px; padding:0.35rem; border:1px solid #cbd5e1; border-radius:6px; text-align:center;">
                <button onclick="addToCart(${p.id})" class="btn btn-primary btn-sm">+ Add</button>
              </div>
            ` : `
              <button class="btn btn-outline btn-sm" disabled style="opacity:0.5;">Sold Out</button>
            `}
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// ---------------- CART & CHECKOUT ----------------
window.addToCart = function(productId) {
  const prod = loadedProducts.find(p => p.id === productId);
  if (!prod) return;

  const qtyInput = document.getElementById(`qty-${productId}`);
  const qty = parseFloat(qtyInput ? qtyInput.value : 1) || 1;

  if (qty > prod.quantityAvailable) {
    showToast(`Only ${prod.quantityAvailable} ${prod.unit} available!`, "error");
    return;
  }

  // Check if adding from different farmer (each order is per farmer)
  if (cart.length > 0 && cart[0].product.farmerId !== prod.farmerId) {
    if (!confirm("Your cart currently contains produce from a different farmer. Empty cart to add from this farmer?")) {
      return;
    }
    cart = [];
  }

  const existing = cart.find(c => c.product.id === productId);
  if (existing) {
    existing.quantity = Math.min(prod.quantityAvailable, existing.quantity + qty);
  } else {
    cart.push({ product: prod, quantity: qty });
  }

  updateCartBadge();
  showToast(`Added ${qty} ${prod.unit} of ${prod.name} to cart!`, "success");
};

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  const totalCount = cart.reduce((acc, c) => acc + c.quantity, 0);
  if (badge) badge.textContent = totalCount;
}

window.openCartModal = function() {
  renderCartModal();
  openModal('cart-modal');
};

function renderCartModal() {

  const body = document.getElementById('cart-items-body');

  if (!body) return;

  if (cart.length === 0) {

    body.innerHTML = `
      <div class="empty-cart">
        <div class="empty-cart-icon">🛒</div>
        <h4>Your cart is empty</h4>
        <p>Add fresh produce from the marketplace to continue.</p>
      </div>
    `;

    document.getElementById('checkout-btn').disabled = true;

    updateBillBreakdown(0);

    return;
  }

  document.getElementById('checkout-btn').disabled = false;

  let subtotal = 0;

  body.innerHTML = cart.map((item, idx) => {

    const itemTotal =
      item.product.pricePerUnit * item.quantity;

    subtotal += itemTotal;

    return `
      <div class="cart-item">

        <div class="cart-item-info">

          <span class="cart-item-name">
            ${item.product.name}
          </span>

          <span class="cart-item-price">
            ${formatCurrency(item.product.pricePerUnit)}
            / ${item.product.unit}
          </span>

        </div>

        <div class="cart-item-actions">

          <span class="cart-item-quantity">
            ${item.quantity} ${item.product.unit}
          </span>

          <strong class="cart-item-total">
            ${formatCurrency(itemTotal)}
          </strong>

          <button
            type="button"
            onclick="removeFromCart(${idx})"
            class="cart-remove-btn"
            title="Remove item">

            ✕

          </button>

        </div>

      </div>
    `;

  }).join('');

  updateBillBreakdown(subtotal);
}

function updateBillBreakdown(subtotal) {
  const gst = Math.round(subtotal * 0.05 * 100.0) / 100.0;
  const delivery = subtotal > 0 ? 40.00 : 0.00;
  const platform = subtotal > 0 ? 15.00 : 0.00;
  const grandTotal = subtotal > 0 ? (subtotal + gst + delivery + platform) : 0.00;

  document.getElementById('bill-subtotal').textContent = formatCurrency(subtotal);
  document.getElementById('bill-gst').textContent = formatCurrency(gst);
  document.getElementById('bill-delivery').textContent = formatCurrency(delivery);
  document.getElementById('bill-platform').textContent = formatCurrency(platform);
  document.getElementById('bill-grand-total').textContent = formatCurrency(grandTotal);
}

window.removeFromCart = function(index) {
  cart.splice(index, 1);
  updateCartBadge();
  renderCartModal();
};

// ---------------- CHECKOUT & PAYMENT ----------------
window.proceedToCheckout = function() {
  if (cart.length === 0) return;
  closeModal('cart-modal');

  const farmer = cart[0].product;
  const buyer = Auth.getUser();

  // Populate Farmer UPI QR modal
  document.getElementById('pay-farmer-name').textContent = farmer.farmerName;
  document.getElementById('pay-farmer-upi').textContent = farmer.farmerUpiId || "farmer@upi";

  const qrImg = document.getElementById('pay-qr-img');
  const upiUri = `upi://pay?pa=${encodeURIComponent(farmer.farmerUpiId || 'farmer@upi')}&pn=${encodeURIComponent(farmer.farmerName)}&cu=INR`;
  qrImg.src = farmer.farmerQrCodeUrl || `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiUri)}`;

  // Default address and phone from buyer profile
  document.getElementById('checkout-address').value = buyer.address || "";
  document.getElementById('checkout-phone').value = buyer.phone || "";

  openModal('checkout-modal');
};

window.placeFinalOrder = async function () {
  const buyer = Auth.getUser();

  const address = document
    .getElementById("checkout-address")
    .value.trim();

  const phone = document
    .getElementById("checkout-phone")
    .value.trim();

  const selectedPayment = document.querySelector(
    'input[name="payment_choice"]:checked'
  );

  if (!selectedPayment) {
    showToast("Please select a payment method", "error");
    return;
  }

  const payMethod = selectedPayment.value;

  if (!address || !phone) {
    showToast(
      "Please enter delivery address and phone number",
      "error"
    );
    return;
  }

  const payload = {
    buyerId: buyer.id,
    farmerId: cart[0].product.farmerId,
    paymentMethod: payMethod,
    deliveryAddress: address,
    buyerPhone: phone,
    items: cart.map(item => ({
      productId: item.product.id,
      quantity: item.quantity
    }))
  };

  try {
    // 1. Create order
    const response = await fetch(`${API_BASE}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.json();
      showToast(
        error.error || "Failed to place order",
        "error"
      );
      return;
    }

    const order = await response.json();

    // Clear cart after successful order creation
    cart = [];
    updateCartBadge();
    closeModal("checkout-modal");

    // 2. UPI workflow
    if (payMethod.toUpperCase() === "UPI") {

      window.pendingPaymentOrderId = order.id;

      // Display farmer payment information
      document.getElementById("pay-farmer-name").textContent =
        order.farmerName || cart?.[0]?.product?.farmerName || "Farmer";

      document.getElementById("pay-farmer-upi").textContent =
        order.farmerUpiId || "Farmer UPI";

      // Open payment modal
      openModal("online-payment-modal");

      showToast(
        "Order created. Complete UPI payment and enter your UTR.",
        "info"
      );

    } else {

      // 3. COD workflow
      showOrderConfirmationModal(order);

      showToast(
        "COD order placed. Payment will be collected at delivery.",
        "success"
      );
    }

    await loadBuyerOrders(buyer.id);
    await loadBuyerProducts();

  } catch (error) {
    console.error("Order creation error:", error);

    showToast(
      "Error while placing order",
      "error"
    );
  }
};
window.payOrderNow = async function(orderId, farmerUpi, farmerName, qrUrl, grandTotal) {
  document.getElementById('pay-farmer-name').textContent = farmerName;
  document.getElementById('pay-farmer-upi').textContent = farmerUpi || "farmer@upi";
  const qrImg = document.getElementById('pay-qr-img');
  const upiUri = `upi://pay?pa=${encodeURIComponent(farmerUpi || 'farmer@upi')}&pn=${encodeURIComponent(farmerName)}&cu=INR`;
  qrImg.src = qrUrl || `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiUri)}`;

  // Store active order ID for payment
  window.pendingPaymentOrderId = orderId;
  openModal('online-payment-modal');
};

window.confirmOnlinePayment = async function() {
  const orderId = window.pendingPaymentOrderId;
  const utrRef = document.getElementById('online-utr-input') ? document.getElementById('online-utr-input').value.trim() : "";

  try {
    const res = await fetch(`${API_BASE}/orders/${orderId}/confirm-payment?paymentMethod=UPI&transactionRef=${encodeURIComponent(utrRef || 'UPI-' + Date.now())}`, {
      method: 'POST'
    });

    if (res.ok) {
      const order = await res.json();
      closeModal('online-payment-modal');
      showToast("Payment Successful! Delivery OTP has been generated.", "success");
      showOrderConfirmationModal(order);
      loadBuyerOrders(Auth.getUser().id);
    } else {
      showToast("Failed to confirm payment", "error");
    }
  } catch (err) {
    showToast("Server error during payment confirmation", "error");
  }
};

function showOrderConfirmationModal(order) {
  document.getElementById('confirm-order-num').textContent = order.orderNumber;
  document.getElementById('confirm-order-total').textContent = formatCurrency(order.grandTotal);

  const otpBox = document.getElementById('confirm-otp-container');
  const codNotice = document.getElementById('confirm-cod-notice');

  if (order.deliveryOtp) {
    // OTP generated after payment
    if (otpBox) otpBox.style.display = 'block';
    if (codNotice) codNotice.style.display = 'none';
    document.getElementById('confirm-order-otp').textContent = order.deliveryOtp;
  } else {
    // COD payment pending
    if (otpBox) otpBox.style.display = 'none';
    if (codNotice) codNotice.style.display = 'block';
  }

  openModal('order-success-modal');
}

// ---------------- ORDERS HISTORY & OTP TRACKING ----------------
async function loadBuyerOrders(buyerId) {
  try {
    const res = await fetch(`${API_BASE}/orders/buyer/${buyerId}`);
    const orders = await res.json();
    const tbody = document.getElementById('buyer-orders-tbody');
    if (!tbody) return;

    if (!orders || orders.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:#94a3b8;">You haven't placed any orders yet.</td></tr>`;
      return;
    }

    tbody.innerHTML = orders.map(o => {
      const itemsSummary = o.items.map(i => `${i.productName} (${i.quantity} kg)`).join(', ');
      let otpDisplay = "";

      if (o.orderStatus === 'DELIVERED') {
        otpDisplay = `<span class="badge badge-delivered">Delivered</span>`;
      } else if (o.deliveryOtp) {
        // Payment completed -> OTP is visible
        otpDisplay = `
          <div style="background:#eff6ff; border:1.5px dashed #3b82f6; padding:0.4rem 0.65rem; border-radius:6px; text-align:center;">
            <div style="font-size:0.72rem; color:#1e40af; font-weight:700;">DELIVERY OTP</div>
            <strong style="font-size:1.2rem; font-family:monospace; color:#1d4ed8; letter-spacing:2px;">${o.deliveryOtp}</strong>
            <div style="font-size:0.68rem; color:#6b7280;">Share with agent upon arrival</div>
          </div>
        `;
      } else {
        // Payment pending -> OTP not yet generated
        otpDisplay = `
          <div style="text-align:center;">
            <span style="font-size:0.75rem; color:#d97706; display:block; margin-bottom:0.35rem;">🔒 OTP generates after payment</span>
            <button onclick="payOrderNow(${o.id}, '${o.farmerUpiId}', '${o.farmerName}', '${o.farmerQrCodeUrl}', ${o.grandTotal})" class="btn btn-primary btn-sm" style="font-size:0.78rem; padding:0.3rem 0.6rem;">
              💳 Pay via UPI & Get OTP
            </button>
          </div>
        `;
      }

      return `
        <tr>
          <td><strong>${o.orderNumber}</strong><br><small style="color:#94a3b8;">${formatDate(o.createdAt)}</small></td>
          <td>👨‍🌾 ${o.farmerName}<br><small style="color:#64748b;">📍 ${o.farmerDistrict}</small></td>
          <td>${itemsSummary}</td>
          <td>
            <strong>${formatCurrency(o.grandTotal)}</strong><br>
            <small style="color:#64748b;">${o.paymentMethod} (${o.paymentStatus})</small>
          </td>
          <td>${getStatusBadge(o.orderStatus)}</td>
          <td>
            ${o.deliveryAgentName ? `🛵 ${o.deliveryAgentName}<br><small>📞 ${o.deliveryAgentPhone || ''}</small>` : '<span style="color:#94a3b8;">Assigning agent...</span>'}
          </td>
          <td>${otpDisplay}</td>
        </tr>
      `;
    }).join('');
  } catch (err) {
    console.error("Error loading buyer orders:", err);
  }
}

// ---------------- ADVISORY ----------------
function setupBuyerAdvisory(buyer) {
  const form = document.getElementById('buyer-advisory-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      userId: buyer.id,
      cropType: document.getElementById('buyer-adv-crop').value.trim(),
      subject: document.getElementById('buyer-adv-subject').value.trim(),
      question: document.getElementById('buyer-adv-question').value.trim()
    };

    try {
      const res = await fetch(`${API_BASE}/advisory/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showToast("Plant inquiry submitted to expert advisor!", "success");
        form.reset();
        loadBuyerAdvisoryQueries(buyer.id);
      }
    } catch (err) {
      showToast("Failed to submit query", "error");
    }
  });

  loadBuyerAdvisoryQueries(buyer.id);
}

async function loadBuyerAdvisoryQueries(userId) {
  try {
    const res = await fetch(`${API_BASE}/advisory/user/${userId}`);
    const list = await res.json();
    const container = document.getElementById('buyer-queries-list');
    if (!container) return;

    if (!list || list.length === 0) {
      container.innerHTML = `<p style="color:#64748b; font-size:0.9rem;">No questions submitted yet.</p>`;
      return;
    }

    container.innerHTML = list.map(q => `
      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:1.2rem; margin-bottom:1rem;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.4rem;">
          <h4 style="color:#1e293b;">${q.subject} <span style="font-size:0.75rem; background:#e2e8f0; padding:0.2rem 0.4rem; border-radius:4px;">${q.cropType || 'Gardening'}</span></h4>
          <span class="badge ${q.status === 'ANSWERED' ? 'badge-delivered' : 'badge-placed'}">${q.status}</span>
        </div>
        <p style="color:#475569; font-size:0.88rem; margin-bottom:0.75rem;">${q.question}</p>
        ${q.reply ? `
          <div style="background:#f0fdf4; border-left:4px solid #16a34a; padding:0.75rem; border-radius:4px; font-size:0.85rem;">
            <strong>🌱 Advisory Expert Response (${q.repliedByName}):</strong><br>
            ${q.reply}
          </div>
        ` : `
          <div style="color:#d97706; font-size:0.825rem; font-style:italic;">
            ⏳ Awaiting response from agricultural specialist...
          </div>
        `}
      </div>
    `).join('');
  } catch (err) {
    console.error(err);
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

