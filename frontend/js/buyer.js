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
${p.imageUrl
  ? `<img src="${p.imageUrl}" alt="${p.name}"
       onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`
  : ''
}

<div class="no-product-image" style="${p.imageUrl ? 'display:none;' : 'display:flex;'}">
    <span>📷</span>
    <span>No image available</span>
</div>        <span class="product-badge">${p.category}</span>
      </div>
      
      
      
      
      <div class="product-info">
  <div class="product-district">
    📍 ${p.district} • 👨‍🌾 ${p.farmerName}
  </div>

  <h4 class="product-title">${p.name}</h4>

  <p class="product-desc">
    ${p.description || t('farm_fresh_harvest')}
  </p>

  <div class="product-price-row">
    <div>
      <div class="product-price">
        ${formatCurrency(p.pricePerUnit)}
        <span style="font-size:0.8rem; color:#64748b; font-weight:500;">
          / ${p.unit}
        </span>
      </div>

      <div
        class="product-stock"
        style="color: ${p.quantityAvailable > 0 ? '#16a34a' : '#dc2626'}; font-size:0.8rem;"
      >
        ${
          p.quantityAvailable > 0
            ? t('in_stock', {
                quantity: p.quantityAvailable,
                unit: p.unit
              })
            : t('out_of_stock')
        }
      </div>
    </div>

    <div>
      ${
        p.quantityAvailable > 0
          ? `
            <div style="display:flex; align-items:center; gap:0.4rem;">
              <input
                type="number"
                id="qty-${p.id}"
                value="1"
                min="1"
                max="${p.quantityAvailable}"
                step="0.5"
                style="width:55px; padding:0.35rem; border:1px solid #cbd5e1; border-radius:6px; text-align:center;"
              >

              <button
                onclick="addToCart(${p.id})"
                class="btn btn-primary btn-sm"
              >
                ${t('add_to_cart')}
              </button>
            </div>
          `
          : `
            <button
              class="btn btn-outline btn-sm"
              disabled
              style="opacity:0.5;"
            >
              ${t('sold_out')}
            </button>
          `
      }
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

function setFarmerPaymentQR(upiId, farmerName, amount) {
    const qrImg = document.getElementById("pay-qr-img");

    if (!qrImg) {
        console.error("QR image element not found!");
        return;
    }

    if (!upiId || !upiId.includes("@")) {
        console.error("Invalid farmer UPI ID:", upiId);
        qrImg.style.display = "none";
        return;
    }

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
        console.error("Invalid payment amount:", amount);
        qrImg.style.display = "none";
        return;
    }

    const upiUri =
        `upi://pay?pa=${encodeURIComponent(upiId)}` +
        `&pn=${encodeURIComponent(farmerName || "Farmer")}` +
        `&am=${numericAmount.toFixed(2)}` +
        `&cu=INR`;

    console.log("UPI ID:", upiId);
    console.log("Payment Amount:", numericAmount);
    console.log("UPI URI:", upiUri);

  const qrUrl =
    `https://quickchart.io/qr?size=250&text=${encodeURIComponent(upiUri)}`;

    console.log("QR URL:", qrUrl);

    qrImg.onload = function () {
        console.log("QR image loaded successfully");
        qrImg.style.display = "block";
        qrImg.style.visibility = "visible";
    };

    qrImg.onerror = function () {
        console.error("QR image failed to load:", qrUrl);
        qrImg.style.display = "none";
    };

    // Reset and display image
    qrImg.removeAttribute("hidden");
    qrImg.src = "";
    qrImg.src = qrUrl;

    qrImg.style.width = "250px";
    qrImg.style.height = "250px";
    qrImg.style.display = "block";
    qrImg.style.visibility = "visible";
}

window.proceedToCheckout = function () {

  if (cart.length === 0) return;

  closeModal("cart-modal");

  const farmer = cart[0].product;
  const buyer = Auth.getUser();

  // Display farmer information
  document.getElementById("pay-farmer-name").textContent =
    farmer.farmerName || "Farmer";

const farmerUpi =
  farmer.farmerUpiId ||
  farmer.upiId ||
  farmer.farmer?.upiId ||
  "";

console.log("Selected farmer data:", farmer);
console.log("Farmer UPI ID:", farmerUpi);

  document.getElementById("pay-farmer-upi").textContent =
    farmerUpi || "UPI ID unavailable";

  // Display the original QR code supplied by the farmer
// Calculate the estimated total
const subtotal = cart.reduce(
  (sum, item) =>
    sum + (item.product.pricePerUnit * item.quantity),
  0
);

const gst = Math.round(subtotal * 0.05 * 100) / 100;
const delivery = subtotal > 0 ? 40.00 : 0.00;
const platform = subtotal > 0 ? 15.00 : 0.00;

const estimatedTotal = subtotal + gst + delivery + platform;

// Generate dynamic QR with actual checkout total
setFarmerPaymentQR(
  farmerUpi,
  farmer.farmerName || "Farmer",
  estimatedTotal
);
console.log("Farmer QR Code:", farmer.farmerQrCode);

  // Buyer details
  document.getElementById("checkout-address").value =
    buyer.address || "";

  document.getElementById("checkout-phone").value =
    buyer.phone || "";

  openModal("checkout-modal");
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

  // Save farmer details before clearing cart
const selectedFarmer = cart[0].product;

console.log("COMPLETE FARMER PRODUCT DATA:", selectedFarmer);
console.log("FARMER UPI:", selectedFarmer.farmerUpiId);
console.log("FARMER QR:", selectedFarmer.farmerQrCodeUrl);

const savedFarmerName =
  selectedFarmer.farmerName || "Farmer";

const savedFarmerUpi =
  selectedFarmer.farmerUpiId ||
  selectedFarmer.upiId ||
  "";

const savedFarmerQrCode =
  selectedFarmer.farmerQrCode || "";

const totalAmount = cart.reduce(
  (sum, item) =>
    sum + (item.product.pricePerUnit * item.quantity),
  0
);

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
// Generate QR before clearing cart
if (payMethod.toUpperCase() === "UPI") {

setFarmerPaymentQR(
  savedFarmerUpi,
  savedFarmerName,
  order.grandTotal || totalAmount
);

  document.getElementById("pay-farmer-name").textContent =
    savedFarmerName;

  document.getElementById("pay-farmer-upi").textContent =
    savedFarmerUpi || "UPI ID unavailable";
}

// Clear cart only after saving farmer information
cart = [];
updateCartBadge();
closeModal("checkout-modal");

// UPI workflow
if (payMethod.toUpperCase() === "UPI") {

  window.pendingPaymentOrderId = order.id;

  // Use saved farmer details, not the cleared cart
  document.getElementById("pay-farmer-name").textContent =
    savedFarmerName;

  document.getElementById("pay-farmer-upi").textContent =
    savedFarmerUpi || "UPI ID unavailable";

// Generate dynamic QR using UPI ID and order total
setFarmerPaymentQR(
  savedFarmerUpi,
  savedFarmerName,
  order.grandTotal
);

  // Open payment modal
  openModal("online-payment-modal");

  showToast(
    "Order created. Complete UPI payment and enter your UTR.",
    "info"
  );

} else {

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
window.payOrderNow = function (
  orderId,
  farmerUpi,
  farmerName,
  qrUrl,
  grandTotal
) {

  document.getElementById("pay-farmer-name").textContent =
    farmerName || "Farmer";

  document.getElementById("pay-farmer-upi").textContent =
    farmerUpi || "UPI ID unavailable";

// Generate dynamic QR using the actual order amount
setFarmerPaymentQR(
  farmerUpi,
  farmerName,
  grandTotal
);

  window.pendingPaymentOrderId = orderId;

  openModal("online-payment-modal");
};

window.confirmOnlinePayment = async function() {

  
  const orderId = window.pendingPaymentOrderId;
const utrInput = document.getElementById('online-utr-input');

const utrRef = utrInput
  ? utrInput.value.trim()
  : "";
    if (!validateUtr("online-utr-input", true)) {
        return;
    }
// UTR is mandatory
if (!utrRef) {
  showToast(
    "Please enter the Unique Transaction Reference (UTR) after payment.",
    "error"
  );

  if (utrInput) {
    utrInput.focus();
  }

  return;
}

// Basic UTR validation
if (utrRef.length < 6 || utrRef.length > 50) {
  showToast(
    "Please enter a valid UTR number.",
    "error"
  );

  utrInput.focus();
  return;
}

  try {
    const res = await fetch(`${API_BASE}/orders/${orderId}/confirm-payment?paymentMethod=UPI&transactionRef=${encodeURIComponent(utrRef)}`, {
      method: 'POST'
    });

  if (res.ok) {
  const order = await res.json();

  // Save completed order and UTR for payment receipt
  window.lastCompletedOrder = order;
  window.lastPaymentUtr = utrRef;

  closeModal('online-payment-modal');

  showToast(
    "Payment Successful! Delivery OTP has been generated.",
    "success"
  );

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

  // Keep the latest order available for receipt download
  window.lastCompletedOrder = order;

  document.getElementById('confirm-order-num').textContent =
    order.orderNumber;

  document.getElementById('confirm-order-total').textContent =
    formatCurrency(order.grandTotal);

  const otpBox =
    document.getElementById('confirm-otp-container');

  const codNotice =
    document.getElementById('confirm-cod-notice');

  if (order.deliveryOtp) {

    if (otpBox) {
      otpBox.style.display = 'block';
    }

    if (codNotice) {
      codNotice.style.display = 'none';
    }

    document.getElementById('confirm-order-otp').textContent =
      order.deliveryOtp;

  } else {

    if (otpBox) {
      otpBox.style.display = 'none';
    }

    if (codNotice) {
      codNotice.style.display = 'block';
    }
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
            <button onclick="payOrderNow(${o.id}, '${o.farmerUpiId}', '${o.farmerName}', '${o.farmerQrCode}', ${o.grandTotal})" class="btn btn-primary btn-sm" style="font-size:0.78rem; padding:0.3rem 0.6rem;">
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
<td>${cancelButton || '<span style="color:#94a3b8;">Not available</span>'}</td>
        </tr>
      `;

      
      const canCancel =
        o.orderStatus === 'PLACED' ||
        o.orderStatus === 'ACCEPTED_BY_FARMER';

      const cancelButton = canCancel
        ? `<button
             type="button"
             class="btn btn-outline btn-sm"
             onclick="cancelBuyerOrder(${o.id})"
             style="color:#dc2626; border-color:#dc2626;">
             Cancel Order
           </button>`
        : '';

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

// ---------------- PAYMENT APP INTEGRATION ----------------

window.openPaymentApp = function (appName) {

  // Get farmer UPI ID
  const upiElement = document.getElementById('pay-farmer-upi');

  const farmerUpi = upiElement
    ? upiElement.textContent.trim()
    : 'farmer@upi';

  // Get farmer name
  const farmerNameElement =
    document.getElementById('pay-farmer-name');

  const farmerName = farmerNameElement
    ? farmerNameElement.textContent.trim()
    : 'Farmer';

  // Create UPI payment URL
  const upiUrl =
    `upi://pay?pa=${encodeURIComponent(farmerUpi)}` +
    `&pn=${encodeURIComponent(farmerName)}` +
    `&cu=INR`;

  let paymentUrl = upiUrl;

  // App-specific UPI URLs
  switch (appName) {

    case 'gpay':
      paymentUrl =
        `tez://upi/pay?pa=${encodeURIComponent(farmerUpi)}` +
        `&pn=${encodeURIComponent(farmerName)}` +
        `&cu=INR`;
      break;

    case 'phonepe':
      paymentUrl = upiUrl;
      break;

    case 'paytm':
      paymentUrl = upiUrl;
      break;

    default:
      paymentUrl = upiUrl;
  }

  // Attempt to open the payment app
  window.location.href = paymentUrl;

  showToast(
    'Opening payment application...',
    'info'
  );
};
// =========================================================
// PAYMENT RECEIPT PDF
// =========================================================

window.downloadPaymentReceipt = async function () {

  // Check whether a completed order exists
  if (!window.lastCompletedOrder) {

    showToast(
      "Payment receipt is not available.",
      "error"
    );

    return;
  }

  const order = window.lastCompletedOrder;
  const utr = window.lastPaymentUtr || "Not available";
  const buyer = Auth.getUser();

  // Check jsPDF
  if (!window.jspdf || !window.jspdf.jsPDF) {

    showToast(
      "Receipt generator is not loaded. Please refresh the page.",
      "error"
    );

    return;
  }

  const { jsPDF } = window.jspdf;

  const doc = new jsPDF();

  const logoData = await loadIFMAPLogo();

  // ---------------------------------------------------------
  // PAGE SETTINGS
  // ---------------------------------------------------------

  const pageWidth = doc.internal.pageSize.getWidth();

  let y = 20;


  // ---------------------------------------------------------
  // HEADER
  // ---------------------------------------------------------

  doc.setFillColor(22, 101, 52);

  doc.rect(
    0,
    0,
    pageWidth,
    35,
    "F"
  );

  doc.setTextColor(255, 255, 255);

  doc.setFontSize(20);

  doc.setFont("helvetica", "bold");

 doc.addImage(
    logoData,
    "PNG",
    8,
    3,
    29,
    29
);

doc.setFontSize(18);
doc.setFont("helvetica", "bold");


 doc.addImage(
    logoData,
    "PNG",
    8,
    3,
    29,
    29
);

doc.text(
    "PAYMENT RECEIPT",
    pageWidth - 20,
    20,
    {
        align: "right"
    }
);


  // Reset text color

  doc.setTextColor(30, 41, 59);

  y = 50;


  // ---------------------------------------------------------
  // PAYMENT STATUS
  // ---------------------------------------------------------

  doc.setFillColor(220, 252, 231);

  doc.roundedRect(
    20,
    y - 7,
    pageWidth - 40,
    22,
    4,
    4,
    "F"
  );

  doc.setTextColor(22, 101, 52);

  doc.setFontSize(12);

  doc.setFont("helvetica", "bold");

  doc.text(
    "✓ PAYMENT SUCCESSFUL",
    30,
    y + 7
  );

  y += 32;


  // ---------------------------------------------------------
  // ORDER DETAILS
  // ---------------------------------------------------------

  doc.setTextColor(30, 41, 59);

  doc.setFontSize(12);

  doc.setFont("helvetica", "bold");

  doc.text(
    "Order Details",
    20,
    y
  );

  y += 9;

  doc.setFontSize(10);

  doc.setFont("helvetica", "normal");

  doc.text(
    `Order Number: ${order.orderNumber || "-"}`,
    20,
    y
  );

  y += 7;

  doc.text(
    `Order Date: ${formatReceiptDate(order.createdAt)}`,
    20,
    y
  );

  y += 7;

  doc.text(
    `Payment Method: ${order.paymentMethod || "UPI"}`,
    20,
    y
  );

  y += 7;

  doc.text(
    `Payment Status: ${order.paymentStatus || "PAID"}`,
    20,
    y
  );

  y += 7;

  doc.text(
    `UTR / Transaction Reference: ${utr}`,
    20,
    y
  );

  y += 15;


  // ---------------------------------------------------------
  // BUYER DETAILS
  // ---------------------------------------------------------

  doc.setFontSize(12);

  doc.setFont("helvetica", "bold");

  doc.text(
    "Buyer Details",
    20,
    y
  );

  y += 9;

  doc.setFontSize(10);

  doc.setFont("helvetica", "normal");

  doc.text(
    `Name: ${buyer.fullName || order.buyerName || "-"}`,
    20,
    y
  );

  y += 7;

  doc.text(
    `Phone: ${buyer.phone || order.buyerPhone || "-"}`,
    20,
    y
  );

  y += 7;


  // Address may be long
  const address =
    order.deliveryAddress ||
    buyer.address ||
    "-";

  const addressLines =
    doc.splitTextToSize(
      `Delivery Address: ${address}`,
      pageWidth - 40
    );

  doc.text(
    addressLines,
    20,
    y
  );

  y += addressLines.length * 5 + 10;


  // ---------------------------------------------------------
  // FARMER DETAILS
  // ---------------------------------------------------------

  doc.setFontSize(12);

  doc.setFont("helvetica", "bold");

  doc.text(
    "Farmer Details",
    20,
    y
  );

  y += 9;

  doc.setFontSize(10);

  doc.setFont("helvetica", "normal");

  doc.text(
    `Farmer: ${order.farmerName || "-"}`,
    20,
    y
  );

  y += 7;

  doc.text(
    `UPI ID: ${order.farmerUpiId || "-"}`,
    20,
    y
  );

  y += 7;

  doc.text(
    `District: ${order.farmerDistrict || "-"}`,
    20,
    y
  );

  y += 15;


  // ---------------------------------------------------------
  // ITEMS
  // ---------------------------------------------------------

  doc.setFontSize(12);

  doc.setFont("helvetica", "bold");

  doc.text(
    "Items Purchased",
    20,
    y
  );

  y += 8;


  // Table header

  doc.setFillColor(241, 245, 249);

  doc.rect(
    20,
    y,
    pageWidth - 40,
    9,
    "F"
  );

  doc.setFontSize(9);

  doc.setFont("helvetica", "bold");

  doc.text(
    "Product",
    23,
    y + 6
  );

  doc.text(
    "Qty",
    115,
    y + 6
  );

  doc.text(
    "Price",
    145,
    y + 6
  );

  doc.text(
    "Amount",
    pageWidth - 23,
    y + 6,
    {
      align: "right"
    }
  );

  y += 15;


  // Items

  doc.setFont("helvetica", "normal");

if (order.items && order.items.length > 0) {

  order.items.forEach(item => {

    const productName =
      item.productName || "Product";

    const quantity =
      Number(item.quantity || 0);

    const price =
      Number(item.unitPrice || 0);

    const itemTotal =
      Number(item.subtotal || (price * quantity));

    doc.text(
      String(productName).substring(0, 35),
      23,
      y
    );

    doc.text(
      String(quantity),
      115,
      y
    );

    doc.text(
      formatReceiptCurrency(price),
      145,
      y
    );

    doc.text(
      formatReceiptCurrency(itemTotal),
      pageWidth - 23,
      y,
      {
        align: "right"
      }
    );

    y += 8;
  });

} else {

  doc.text(
    "No item details available",
    23,
    y
  );

  y += 8;
}

y += 7;


  // ---------------------------------------------------------
  // BILL SUMMARY
  // ---------------------------------------------------------

  doc.setDrawColor(203, 213, 225);

  doc.line(
    20,
    y,
    pageWidth - 20,
    y
  );

  y += 10;

  doc.setFontSize(10);

  addReceiptAmountRow(
    doc,
    "Produce Subtotal",
    order.productTotal,
    y
  );

  y += 7;

  addReceiptAmountRow(
    doc,
    "GST (5%)",
    order.gstAmount,
    y
  );

  y += 7;

  addReceiptAmountRow(
    doc,
    "Delivery Charges",
    order.deliveryCharge,
    y
  );

  y += 7;

  addReceiptAmountRow(
    doc,
    "Platform Fee",
    order.platformCharge,
    y
  );

  y += 10;


  // ---------------------------------------------------------
  // GRAND TOTAL
  // ---------------------------------------------------------

  doc.setFillColor(240, 253, 244);

  doc.roundedRect(
    20,
    y - 6,
    pageWidth - 40,
    18,
    3,
    3,
    "F"
  );

  doc.setFontSize(12);

  doc.setFont("helvetica", "bold");

  doc.setTextColor(22, 101, 52);

  doc.text(
    "TOTAL PAID",
    27,
    y + 5
  );

  doc.text(
    formatReceiptCurrency(order.grandTotal),
    pageWidth - 27,
    y + 5,
    {
      align: "right"
    }
  );

  y += 30;


  // ---------------------------------------------------------
  // SECURITY NOTE
  // ---------------------------------------------------------

  doc.setTextColor(100, 116, 139);

  doc.setFontSize(8);

  doc.setFont("helvetica", "normal");

  const note =
    "This receipt confirms the UPI payment submitted for the above order. " +
    "The delivery OTP is not included in this receipt for security reasons.";

  const noteLines =
    doc.splitTextToSize(
      note,
      pageWidth - 40
    );

  doc.text(
    noteLines,
    20,
    y
  );


  // ---------------------------------------------------------
  // FOOTER
  // ---------------------------------------------------------

  const pageHeight =
    doc.internal.pageSize.getHeight();

  doc.setFontSize(8);

  doc.setTextColor(148, 163, 184);

doc.addImage(
    logoData,
    "PNG",
    pageWidth / 2 - 10,
    pageHeight - 30,
    20,
    20
);
doc.setFontSize(8);
doc.setTextColor(148, 163, 184);

doc.text(
    "IFMAP • Integrated Farmer Marketplace",
    pageWidth / 2,
    pageHeight - 7,
    {
        align: "center"
    }
);


  // ---------------------------------------------------------
  // DOWNLOAD
  // ---------------------------------------------------------

  const fileName =
    `AgroMarket_Payment_Receipt_${order.orderNumber || "Order"}.pdf`;

  doc.save(fileName);

  showToast(
    "Payment receipt downloaded successfully.",
    "success"
  );
};


// =========================================================
// RECEIPT HELPER FUNCTIONS
// =========================================================

function formatReceiptCurrency(value) {

  const amount = Number(value || 0);

  return `Rs. ${amount.toFixed(2)}`;
}


function formatReceiptDate(dateValue) {

  if (!dateValue) {
    return "-";
  }

  try {

    const date = new Date(dateValue);

    return date.toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }
    );

  } catch (error) {

    return String(dateValue);
  }
}


function addReceiptAmountRow(
  doc,
  label,
  amount,
  y
) {

  const pageWidth =
    doc.internal.pageSize.getWidth();

  doc.setTextColor(71, 85, 105);

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.text(
    label,
    25,
    y
  );

  doc.text(
    formatReceiptCurrency(amount),
    pageWidth - 25,
    y,
    {
      align: "right"
    }
  );
}
function validateUtr(inputId, required = true) {
    const input = document.getElementById(inputId);

    if (!input) {
        return true;
    }

    const value = input.value.trim();

    // If optional and empty, allow it
    if (!required && value === "") {
        input.setCustomValidity("");
        return true;
    }

    // Must contain exactly 12 digits
    if (!/^\d{12}$/.test(value)) {
        input.setCustomValidity(
            typeof t === "function"
                ? t("invalid_utr_length")
                : "UTR must contain exactly 12 digits."
        );

        input.reportValidity();
        input.focus();

        return false;
    }

    input.setCustomValidity("");
    return true;
}
document.addEventListener("DOMContentLoaded", function () {

    const onlineUtr = document.getElementById("online-utr-input");

    if (onlineUtr) {
        onlineUtr.addEventListener("input", function () {

            // Allow digits only
            this.value = this.value.replace(/\D/g, "");

            if (this.value.length === 12) {
                this.setCustomValidity("");
            } else {
                this.setCustomValidity(
                    typeof t === "function"
                        ? t("invalid_utr_length")
                        : "UTR must contain exactly 12 digits."
                );
            }
        });
    }

});

/* =========================================================
   IFMAP LOGO FOR PDF
   ========================================================= */

function loadIFMAPLogo() {

    return new Promise((resolve, reject) => {

        const img = new Image();

        img.onload = function () {

            const canvas = document.createElement("canvas");

            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;

            const ctx = canvas.getContext("2d");

            ctx.drawImage(
                img,
                0,
                0
            );

            resolve(
                canvas.toDataURL("image/png")
            );
        };

        img.onerror = function () {
            reject(new Error("IFMAP logo could not be loaded"));
        };

        img.src = "images/ifmap-logo.png";
    });
}


window.cancelBuyerOrder = async function(orderId) {
  const buyer = Auth.getUser();

  if (!confirm("Are you sure you want to cancel this order?")) {
    return;
  }

  try {
    const response = await fetch(
      `${API_BASE}/orders/${orderId}/cancel?requesterId=${encodeURIComponent(buyer.id)}`,
      { method: "POST" }
    );

    const result = await response.json();

    if (!response.ok) {
      showToast(
        result.error || "Failed to cancel order.",
        "error"
      );
      return;
    }

    showToast("Order cancelled successfully.", "success");

    await loadBuyerOrders(buyer.id);
    await loadBuyerProducts();

  } catch (error) {
    console.error("Cancellation error:", error);
    showToast(
      "Unable to cancel order. Please try again.",
      "error"
    );
  }
};
