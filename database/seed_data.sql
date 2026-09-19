-- ==========================================================
-- INTEGRATED FARMER MARKETPLACE & AGRICULTURAL ADVISORY PLATFORM
-- Seed Data for Testing & Demonstration
-- ==========================================================

USE agromarket_db;

-- 1. SEED USERS (Password for all accounts: 'password123')
INSERT INTO users (id, full_name, email, password, role, phone, district, state, address, upi_id, qr_code_url, bank_account_no, bank_ifsc, bank_name, vehicle_type, specialization) VALUES
(1, 'Ramesh Kumar (Farmer)', 'farmer@agromarket.com', 'password123', 'FARMER', '9876543210', 'Coimbatore', 'Tamil Nadu', 'Village Farm, Pollachi Road, Coimbatore', 'rameshkumar@upi', 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=rameshkumar@upi%26pn=Ramesh%20Kumar%26cu=INR', NULL, NULL, NULL, NULL, NULL),
(2, 'Priya Sharma (Buyer)', 'buyer@agromarket.com', 'password123', 'BUYER', '9876543211', 'Coimbatore', 'Tamil Nadu', '45, Green Avenue, RS Puram, Coimbatore', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'Suresh Verma (Delivery Agent)', 'delivery@agromarket.com', 'password123', 'DELIVERY', '9876543212', 'Coimbatore', 'Tamil Nadu', 'Near Bus Stand, Gandhipuram, Coimbatore', NULL, NULL, '109823485721', 'SBIN0001234', 'State Bank of India', 'Motorcycle', NULL),
(4, 'Dr. Ananya Swaminathan (Agronomist)', 'advisor@agromarket.com', 'password123', 'ADVISORY', '9876543213', 'Coimbatore', 'Tamil Nadu', 'Tamil Nadu Agricultural University, Coimbatore', NULL, NULL, NULL, NULL, NULL, NULL, 'Organic Farming & Crop Pathology');

-- 2. SEED PRODUCTS
INSERT INTO products (id, farmer_id, name, category, price_per_unit, unit, quantity_available, description, image_url, district) VALUES
(1, 1, 'Organic Country Tomatoes', 'Vegetables', 35.00, 'kg', 50.00, 'Freshly harvested farm-grown juicy red country tomatoes without chemical pesticides.', 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=60', 'Coimbatore'),
(2, 1, 'Farm Fresh Green Chillies', 'Vegetables', 45.00, 'kg', 25.00, 'Spicy, crisp, and freshly picked green chillies from the morning harvest.', 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=500&auto=format&fit=crop&q=60', 'Coimbatore'),
(3, 1, 'Fresh Tender Coconut (Pack of 5)', 'Fruits', 180.00, 'bunch', 40.00, 'Naturally sweet and hydrating Pollachi tender coconuts directly from the palm groves.', 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=500&auto=format&fit=crop&q=60', 'Coimbatore'),
(4, 1, 'Natural Pure Farm Honey', 'Organic Goods', 320.00, 'bottle', 15.00, 'Raw unprocessed wildflower bee honey extracted sustainably from our orchard hives.', 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&auto=format&fit=crop&q=60', 'Coimbatore'),
(5, 1, 'Native Ponni Raw Rice', 'Grains & Pulses', 65.00, 'kg', 100.00, 'Traditional unpolished aromatic Ponni rice, aged 1 year for superior fluffiness and taste.', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=60', 'Coimbatore');

-- 3. SEED ADVISORY QUERIES
INSERT INTO advisory_queries (id, user_id, user_name, user_role, district, crop_type, subject, question, status, reply, replied_by_id, replied_by_name, created_at, replied_at) VALUES
(1, 1, 'Ramesh Kumar (Farmer)', 'FARMER', 'Coimbatore', 'Tomato', 'Leaf Curling & Yellow Mosaic Issues', 'My tomato crop leaves are showing slight upward curling and yellow patches along the veins. What organic spray can I use?', 'ANSWERED', 'This is likely Tomato Leaf Curl Virus transmitted by whiteflies. Immediately spray Neem Seed Kernel Extract (5%) or pure cold-pressed neem oil (5ml per liter of water) with a mild soap emulsifier. Also install yellow sticky traps to capture whiteflies.', 4, 'Dr. Ananya Swaminathan (Agronomist)', NOW() - INTERVAL 2 DAY, NOW() - INTERVAL 1 DAY),
(2, 2, 'Priya Sharma (Buyer)', 'BUYER', 'Coimbatore', 'Kitchen Garden / Coriander', 'Growing coriander on balcony', 'How often should I water balcony coriander seeds during hot sunny afternoons?', 'OPEN', NULL, NULL, NULL, NOW() - INTERVAL 3 HOUR, NULL);

-- 4. SEED SAMPLE ORDER (DEMONSTRATING 70% FARMER / 30% DELIVERY COMMISSION & STATUS FLOW)
INSERT INTO orders (id, order_number, buyer_id, farmer_id, delivery_agent_id, product_total, gst_amount, delivery_charge, platform_charge, grand_total, farmer_earnings, delivery_earnings, payment_method, payment_status, order_status, delivery_otp, delivery_address, buyer_phone, farmer_district, buyer_district, farmer_maps_query, buyer_maps_query, created_at) VALUES
(1, 'ORD-202609-8812', 2, 1, 3, 210.00, 10.50, 40.00, 15.00, 275.50, 147.00, 63.00, 'UPI', 'COMPLETED', 'ACCEPTED_BY_FARMER', '482910', '45, Green Avenue, RS Puram, Coimbatore', '9876543211', 'Coimbatore', 'Coimbatore', 'Village Farm, Pollachi Road, Coimbatore', '45, Green Avenue, RS Puram, Coimbatore', NOW() - INTERVAL 1 HOUR);

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, subtotal) VALUES
(1, 1, 'Organic Country Tomatoes', 6.00, 35.00, 210.00);

-- 5. SEED NOTIFICATIONS
INSERT INTO notifications (user_id, title, message, is_read, created_at) VALUES
(1, 'New Order Received', 'Buyer Priya Sharma placed an order #ORD-202609-8812 for 6.00 kg of Organic Country Tomatoes. Please review and accept.', 0, NOW() - INTERVAL 1 HOUR);
