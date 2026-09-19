# Integrated Farmer Marketplace and Agricultural Advisory Web Platform

A full-stack, multilingual agricultural e-commerce and advisory web platform connecting **Farmers**, **Buyers**, **Delivery Agents**, and **Agricultural Advisors**.

---

## 🌾 Project Architecture

- **Frontend (`frontend/`)**: HTML5, CSS3, Modern JavaScript (ES6+), Chart.js (monthly earnings), Multilingual i18n support (English, Hindi, Tamil, Telugu).
- **Backend (`backend/`)**: Java 21, Spring Boot 3.2, RESTful APIs, Spring Data JPA, CORS enabled.
- **Database (`database/`)**: SQL (MySQL 8.0 schema & seed scripts included, with instant embedded H2 zero-config mode enabled by default).

```
d:/MINI PROJECT S7/
├── backend/
│   ├── pom.xml
│   └── src/
│       └── main/
│           ├── java/com/agromarket/
│           │   ├── config/ (CORS & Sample Data Initializer)
│           │   ├── controller/ (Auth, Products, Orders, Advisory, Weather, Notifications)
│           │   ├── dto/
│           │   ├── model/ (User, Product, Order, OrderItem, AdvisoryQuery, Notification)
│           │   ├── repository/
│           │   └── service/
│           └── resources/
│               └── application.properties
├── frontend/
│   ├── css/
│   │   ├── style.css (Global theme & design system)
│   │   ├── auth.css (Login & dynamic role fields)
│   │   └── dashboard.css (Card layouts, badges, tables, OTP styling)
│   ├── js/
│   │   ├── app.js (Auth state & shared helpers)
│   │   ├── auth.js (Authentication & registration handlers)
│   │   ├── farmer.js (Products, stock auto-deduction, Chart.js earnings)
│   │   ├── buyer.js (Marketplace browsing, cart, bill breakdown, UPI QR & COD)
│   │   ├── delivery.js (Google Maps routing, OTP verification, 30% payout)
│   │   ├── advisory.js (Expert response panel)
│   │   ├── weather.js (District agricultural microclimate forecast)
│   │   └── translations.js (English, Hindi, Tamil, Telugu)
│   ├── index.html (Landing page)
│   ├── auth.html (Login & Role registration)
│   ├── farmer-dashboard.html
│   ├── buyer-dashboard.html
│   ├── delivery-dashboard.html
│   └── advisory-dashboard.html
└── database/
    ├── schema.sql (MySQL DDL)
    └── seed_data.sql (Sample records)
```

---

## 🚀 Quick Start Guide

### 1. Run Backend (Java Spring Boot)
Open a terminal in `backend/` and run:
```powershell
cd "d:\MINI PROJECT S7\backend"
mvn spring-boot:run
```
Or run the packaged JAR:
```powershell
java -jar target/agromarket-backend-1.0.0.jar
```
*The backend starts at `http://localhost:8085/api`.*
*H2 Database Console is available at `http://localhost:8085/h2-console` (JDBC URL: `jdbc:h2:mem:agromarket_db`).*

### 2. Open Frontend
Open `frontend/index.html` in any web browser (Google Chrome, Edge, Firefox), or serve it using any local web server.

---

## 🔑 Pre-Configured Demo Accounts (Password: `password123`)

| Role | Email | Password | Features / Role Notes |
| :--- | :--- | :--- | :--- |
| **Farmer** | `farmer@agromarket.com` | `password123` | UPI ID: `rameshfarmer@okaxis`, QR code, produce listing, order confirmation with auto stock reduction, monthly earnings bar chart |
| **Buyer** | `buyer@agromarket.com` | `password123` | District produce catalog, cart, GST + delivery + platform fee breakdown, farmer UPI QR payment, OTP tracking |
| **Delivery Agent** | `delivery@agromarket.com` | `password123` | Google Maps routing, buyer OTP verification, 30% delivery commission split |
| **Advisory Expert**| `advisor@agromarket.com` | `password123` | Agricultural pathology guidance, expert replies to farmers & buyers, weather alerts |

---

## 💎 Core Capabilities

### 1. Farmer Dashboard
- **Produce Management**: Add, update, and remove crops with stock in kg/units.
- **Inventory Auto-Deduction**: When farmer accepts a buyer's order (e.g. 3 kg ordered from a 5 kg lot), the stock immediately reduces from 5 kg to 2 kg.
- **Monthly Earnings Bar Chart**: Visualized with Chart.js showing 70% net revenue month-by-month.
- **Direct UPI QR**: Displays farmer's registered UPI ID & QR code for direct scan-and-pay transactions.
- **Agricultural Weather**: Live temperature, humidity, precipitation probability, and farming advice.

### 2. Buyer Marketplace
- **District-Filtered Shopping**: Filter fresh crops by district (e.g. Coimbatore, Madurai, Salem) and category.
- **Cart & Bill Breakdown**: Shows Produce Subtotal, GST (5%), Delivery Fee (₹40), Platform Fee (₹15), and Grand Total.
- **Payment Options**: Instant Farmer UPI QR scanning or Cash on Delivery (COD).
- **Secure 6-Digit OTP**: Displayed on buyer's dashboard to give to delivery boy upon physical drop-off.

### 3. Delivery Agent Portal
- **District Route Navigation**: Direct one-click **Open in Google Maps** links for farmer pickup and buyer drop-off.
- **OTP Verification**: Agent inputs buyer's 6-digit OTP to change order status to `DELIVERED` across all dashboards.
- **70% / 30% Transparent Split**: 70% goes to the farmer and 30% goes to the delivery agent's registered bank account.

### 4. Agricultural Advisory Panel
- Resolves crop disease, pest control, organic fertilizer, and cultivation inquiries.
- District weather monitoring and seasonal warnings.

### 5. Multilingual Support
- Switch seamlessly between **English**, **हिन्दी (Hindi)**, **தமிழ் (Tamil)**, and **తెలుగు (Telugu)** dynamically.
