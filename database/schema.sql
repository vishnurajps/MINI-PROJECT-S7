-- ==========================================================
-- INTEGRATED FARMER MARKETPLACE & AGRICULTURAL ADVISORY PLATFORM
-- Database Schema (MySQL Compatible)
-- ==========================================================

CREATE DATABASE IF NOT EXISTS agromarket_db;
USE agromarket_db;

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL, -- 'FARMER', 'BUYER', 'DELIVERY', 'ADVISORY'
    phone VARCHAR(20) NOT NULL,
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    address TEXT,
    
    -- Farmer specific fields
    upi_id VARCHAR(100),
    qr_code_url TEXT,
    farm_size_acres DECIMAL(10, 2),
    
    -- Delivery Agent specific fields
    vehicle_type VARCHAR(50),
    vehicle_number VARCHAR(50),
    bank_account_no VARCHAR(50),
    bank_ifsc VARCHAR(50),
    bank_name VARCHAR(100),
    is_available BOOLEAN DEFAULT TRUE,
    
    -- Advisory specific fields
    specialization VARCHAR(150),
    qualification VARCHAR(150),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    farmer_id BIGINT NOT NULL,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL, -- 'Vegetables', 'Fruits', 'Grains & Pulses', 'Spices', etc.
    price_per_unit DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(20) NOT NULL DEFAULT 'kg', -- 'kg', 'quintal', 'liter', 'bunch'
    quantity_available DECIMAL(10, 2) NOT NULL, -- e.g., 5.00 kg
    description TEXT,
    image_url TEXT,
    district VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (farmer_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    buyer_id BIGINT NOT NULL,
    farmer_id BIGINT NOT NULL,
    delivery_agent_id BIGINT,
    
    -- Bill Breakdown
    product_total DECIMAL(10, 2) NOT NULL,
    gst_amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,        -- 5% GST
    delivery_charge DECIMAL(10, 2) NOT NULL DEFAULT 40.00,   -- Standard ₹40
    platform_charge DECIMAL(10, 2) NOT NULL DEFAULT 15.00,   -- Standard ₹15
    grand_total DECIMAL(10, 2) NOT NULL,
    
    -- Earnings Split: 70% to Farmer, 30% to Delivery Agent
    farmer_earnings DECIMAL(10, 2) NOT NULL,
    delivery_earnings DECIMAL(10, 2) NOT NULL,
    
    -- Payment Details
    payment_method VARCHAR(50) NOT NULL, -- 'UPI', 'COD'
    payment_status VARCHAR(50) NOT NULL DEFAULT 'PENDING', -- 'PENDING', 'COMPLETED'
    
    -- Lifecycle Status
    -- 'PLACED', 'ACCEPTED_BY_FARMER', 'PICKED_UP', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'
    order_status VARCHAR(50) NOT NULL DEFAULT 'PLACED',
    
    -- OTP for secure delivery confirmation
    delivery_otp VARCHAR(10) NOT NULL,
    
    -- Delivery & Location metadata
    delivery_address TEXT NOT NULL,
    buyer_phone VARCHAR(20) NOT NULL,
    farmer_district VARCHAR(100) NOT NULL,
    buyer_district VARCHAR(100) NOT NULL,
    farmer_maps_query VARCHAR(255),
    buyer_maps_query VARCHAR(255),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delivered_at TIMESTAMP NULL,
    
    FOREIGN KEY (buyer_id) REFERENCES users(id),
    FOREIGN KEY (farmer_id) REFERENCES users(id),
    FOREIGN KEY (delivery_agent_id) REFERENCES users(id)
);

-- 4. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    product_name VARCHAR(200) NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL, -- e.g., 3.00 kg
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- 5. ADVISORY QUERIES TABLE
CREATE TABLE IF NOT EXISTS advisory_queries (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    user_name VARCHAR(150) NOT NULL,
    user_role VARCHAR(50) NOT NULL, -- 'FARMER' or 'BUYER'
    district VARCHAR(100) NOT NULL,
    crop_type VARCHAR(100),
    subject VARCHAR(255) NOT NULL,
    question TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'OPEN', -- 'OPEN', 'ANSWERED'
    reply TEXT,
    replied_by_id BIGINT,
    replied_by_name VARCHAR(150),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    replied_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (replied_by_id) REFERENCES users(id)
);

-- 6. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 7. MONTHLY EARNINGS LEDGER
CREATE TABLE IF NOT EXISTS earnings_ledger (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL, -- Farmer or Delivery Agent
    role VARCHAR(50) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    transaction_type VARCHAR(50) NOT NULL, -- 'FARMER_70_PERCENT', 'DELIVERY_30_PERCENT'
    month_year VARCHAR(20) NOT NULL, -- e.g. '2026-09'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
