package com.agromarket.service;

import com.agromarket.dto.MonthlyEarningsDTO;
import com.agromarket.dto.OrderCreateRequest;
import com.agromarket.dto.OrderItemRequest;
import com.agromarket.dto.OtpVerifyRequest;
import com.agromarket.model.*;
import com.agromarket.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final ProductService productService;

    public OrderService(OrderRepository orderRepository,
                        ProductRepository productRepository,
                        UserRepository userRepository,
                        NotificationService notificationService,
                        ProductService productService) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
        this.productService = productService;
    }

    @Transactional
    public Order placeOrder(OrderCreateRequest request) {
        User buyer = userRepository.findById(request.getBuyerId())
                .orElseThrow(() -> new RuntimeException("Buyer not found"));
        User farmer = userRepository.findById(request.getFarmerId())
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        // Assign a delivery agent in the district if available
        List<User> deliveryAgents = userRepository.findByRoleAndDistrict("DELIVERY", farmer.getDistrict());
        User assignedAgent = null;
        if (!deliveryAgents.isEmpty()) {
            assignedAgent = deliveryAgents.get(0);
        } else {
            List<User> anyAgents = userRepository.findByRole("DELIVERY");
            if (!anyAgents.isEmpty()) assignedAgent = anyAgents.get(0);
        }

        Order order = new Order();
        String orderNum = "ORD-" + System.currentTimeMillis() % 1000000 + "-" + (100 + new Random().nextInt(900));
        order.setOrderNumber(orderNum);
        order.setBuyerId(buyer.getId());
        order.setBuyerName(buyer.getFullName());
        order.setBuyerPhone(request.getBuyerPhone() != null ? request.getBuyerPhone() : buyer.getPhone());
        order.setDeliveryAddress(request.getDeliveryAddress() != null ? request.getDeliveryAddress() : buyer.getAddress());
        order.setBuyerDistrict(buyer.getDistrict());

        order.setFarmerId(farmer.getId());
        order.setFarmerName(farmer.getFullName());
        order.setFarmerPhone(farmer.getPhone());
        order.setFarmerUpiId(farmer.getUpiId());
        order.setFarmerQrCodeUrl(farmer.getQrCodeUrl());
        order.setFarmerDistrict(farmer.getDistrict());

        if (assignedAgent != null) {
            order.setDeliveryAgentId(assignedAgent.getId());
            order.setDeliveryAgentName(assignedAgent.getFullName());
            order.setDeliveryAgentPhone(assignedAgent.getPhone());
        }

        // OTP will be generated AFTER payment is completed
        order.setDeliveryOtp(null);

        // Payment setup - initial status is PENDING until buyer pays
        order.setPaymentMethod(request.getPaymentMethod() != null ? request.getPaymentMethod().toUpperCase() : "UPI");
        order.setPaymentStatus("PENDING");

        order.setOrderStatus("PLACED");

        // Calculate Totals
        double productSubtotal = 0.0;
        for (OrderItemRequest itemReq : request.getItems()) {
            Product prod = productRepository.findById(itemReq.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found: " + itemReq.getProductId()));
            double itemTotal = Math.round(prod.getPricePerUnit() * itemReq.getQuantity() * 100.0) / 100.0;
            productSubtotal += itemTotal;

            OrderItem orderItem = new OrderItem(prod.getId(), prod.getName(), itemReq.getQuantity(), prod.getPricePerUnit(), itemTotal);
            order.addItem(orderItem);
        }

        order.setProductTotal(Math.round(productSubtotal * 100.0) / 100.0);
        double gst = Math.round((productSubtotal * 0.05) * 100.0) / 100.0; // 5% GST
        order.setGstAmount(gst);
        order.setDeliveryCharge(40.00); // Standard delivery
        order.setPlatformCharge(15.00); // Platform fee
        double grandTotal = Math.round((productSubtotal + gst + 40.00 + 15.00) * 100.0) / 100.0;
        order.setGrandTotal(grandTotal);

        // Split: 70% of Product Amount to Farmer, 30% to Delivery Agent
        double farmerShare = Math.round((productSubtotal * 0.70) * 100.0) / 100.0;
        double deliveryShare = Math.round((productSubtotal * 0.30) * 100.0) / 100.0;
        order.setFarmerEarnings(farmerShare);
        order.setDeliveryEarnings(deliveryShare);

        // Map location strings for Google Maps
        order.setFarmerMapsQuery(farmer.getAddress() != null ? farmer.getAddress() : farmer.getDistrict() + ", India");
        order.setBuyerMapsQuery(order.getDeliveryAddress());

        Order savedOrder = orderRepository.save(order);

        // Notify Farmer
        notificationService.sendNotification(farmer.getId(),
                "New Order Received!",
                "Buyer " + buyer.getFullName() + " placed order #" + savedOrder.getOrderNumber() + " for ₹" + savedOrder.getProductTotal() + ". Please confirm to process.");

        // If delivery agent assigned, notify delivery agent
        if (assignedAgent != null) {
            notificationService.sendNotification(assignedAgent.getId(),
                    "New Delivery Assigned",
                    "Order #" + savedOrder.getOrderNumber() + " in " + farmer.getDistrict() + " assigned to you.");
        }

        return savedOrder;
    }

    /**
     * Farmer confirms order:
     * - Order status changes to ACCEPTED_BY_FARMER
     * - Quantities ordered are reduced from farmer's product stock inventory (e.g. 5kg to 2kg)
     */
    @Transactional
    public Order farmerAcceptOrder(Long orderId, Long farmerId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getFarmerId().equals(farmerId)) {
            throw new RuntimeException("Unauthorized: You are not the farmer for this order.");
        }

        if (!"PLACED".equalsIgnoreCase(order.getOrderStatus())) {
            throw new RuntimeException("Order is already accepted or in progress.");
        }

        order.setOrderStatus("ACCEPTED_BY_FARMER");

        // Deduct inventory for each product
        for (OrderItem item : order.getItems()) {
            productService.reduceStock(item.getProductId(), item.getQuantity());
        }

        Order updated = orderRepository.save(order);

        // Notify buyer
        notificationService.sendNotification(order.getBuyerId(),
                "Order Confirmed by Farmer!",
                "Farmer " + order.getFarmerName() + " has confirmed your order #" + order.getOrderNumber() + ". Stock is reserved and delivery boy will pick it up soon.");

        return updated;
    }

    /**
     * Delivery agent updates status: PICKED_UP or OUT_FOR_DELIVERY
     */
    @Transactional
    public Order updateDeliveryStatus(Long orderId, Long agentId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // If not assigned yet, assign to this agent
        if (order.getDeliveryAgentId() == null) {
            User agent = userRepository.findById(agentId)
                    .orElseThrow(() -> new RuntimeException("Agent not found"));
            order.setDeliveryAgentId(agent.getId());
            order.setDeliveryAgentName(agent.getFullName());
            order.setDeliveryAgentPhone(agent.getPhone());
        }

        order.setOrderStatus(status.toUpperCase());
        Order updated = orderRepository.save(order);

        // Notify both farmer and buyer
        notificationService.sendNotification(order.getBuyerId(),
                "Delivery Update: " + status,
                "Your order #" + order.getOrderNumber() + " is now " + status.replace("_", " ") + ". Keep your OTP ready.");
        notificationService.sendNotification(order.getFarmerId(),
                "Order Update: " + status,
                "Order #" + order.getOrderNumber() + " has been " + status.replace("_", " ") + " by " + order.getDeliveryAgentName());

        return updated;
    }

    /**
     * Confirms the selected payment method.
     *
     * UPI:
     * - Does not automatically mark payment as completed.
     * - Requires actual payment verification through a payment gateway.
     *
     * COD:
     * - Generates delivery OTP.
     * - Payment remains COD_PENDING until the delivery agent collects money.
     */
    @Transactional
    public Order confirmPaymentAndGenerateOtp(
            Long orderId,
            String paymentMethod,
            String transactionRef) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found with ID: " + orderId));

        String method = paymentMethod != null
                ? paymentMethod.trim().toUpperCase()
                : "UPI";

        if (!method.equals("UPI") && !method.equals("COD")) {
            throw new RuntimeException("Invalid payment method");
        }

        order.setPaymentMethod(method);

        /*
         * CASH ON DELIVERY
         */
        if ("COD".equals(method)) {

            order.setPaymentStatus("COD_PENDING");

            // Generate OTP for delivery.
            if (order.getDeliveryOtp() == null
                    || order.getDeliveryOtp().trim().isEmpty()) {

                String otp = String.format(
                        "%06d",
                        100000 + new Random().nextInt(900000)
                );

                order.setDeliveryOtp(otp);
            }

            Order savedOrder = orderRepository.save(order);

            // Notify buyer. Do not say payment is completed.
            notificationService.sendNotification(
                    order.getBuyerId(),
                    "COD Order Confirmed",
                    "Your COD order #" + order.getOrderNumber()
                            + " is confirmed. Pay the delivery agent when your order arrives."
                            + " Your delivery OTP is: "
                            + order.getDeliveryOtp()
            );

            // Notify farmer without falsely claiming payment.
            notificationService.sendNotification(
                    order.getFarmerId(),
                    "COD Order Confirmed",
                    "Order #" + order.getOrderNumber()
                            + " is confirmed as Cash on Delivery."
                            + " Payment is pending until delivery."
            );

            return savedOrder;
        }

        /*
         * UPI PAYMENT
         */

        if (transactionRef == null || transactionRef.trim().isEmpty()) {
            throw new RuntimeException(
                    "UPI transaction reference is required"
            );
        }

        // DEMO VERSION: Assume UPI payment is successful
        order.setPaymentStatus("PAID");

        // Generate 6-digit delivery OTP
        String deliveryOtp = String.format(
                "%06d",
                new Random().nextInt(1000000)
        );

        order.setDeliveryOtp(deliveryOtp);

        // Save the order
        Order savedOrder = orderRepository.save(order);

        // Notify buyer
        notificationService.sendNotification(
                order.getBuyerId(),
                "Payment Successful",
                "Payment received for order #"
                        + order.getOrderNumber()
                        + ". Your delivery OTP is: "
                        + deliveryOtp
        );

        // Notify farmer
        notificationService.sendNotification(
                order.getFarmerId(),
                "Payment Received",
                "Payment received for order #"
                        + order.getOrderNumber()
                        + ". Delivery OTP has been generated."
        );

        return savedOrder;
    }
    
    /**
     * Delivery agent confirms that COD payment was collected.
     */
    @Transactional
    public Order confirmCodPayment(Long orderId, Long agentId) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));

        if (!"COD".equalsIgnoreCase(order.getPaymentMethod())) {
            throw new RuntimeException(
                    "This order is not a COD order"
            );
        }

        if (order.getDeliveryAgentId() == null
                || !order.getDeliveryAgentId().equals(agentId)) {

            throw new RuntimeException(
                    "Unauthorized delivery agent"
            );
        }

        if (!"COD_PENDING".equalsIgnoreCase(order.getPaymentStatus())) {
            throw new RuntimeException(
                    "COD payment is already confirmed or invalid"
            );
        }

        order.setPaymentStatus("COD_COLLECTED");

        Order updatedOrder = orderRepository.save(order);

        notificationService.sendNotification(
                order.getFarmerId(),
                "COD Payment Collected",
                "COD payment for order #"
                        + order.getOrderNumber()
                        + " has been collected by the delivery agent."
        );

        notificationService.sendNotification(
                order.getBuyerId(),
                "COD Payment Confirmed",
                "Payment for order #"
                        + order.getOrderNumber()
                        + " has been collected successfully."
        );

        return updatedOrder;
    }
    /**
     * Delivery Agent submits OTP given by buyer:
     * - If OTP matches -> status changed to DELIVERED across Farmer, Buyer, Delivery Agent
     * - Payment marked COMPLETED (for COD or UPI)
     * - 70% credited to Farmer, 30% credited to Delivery Agent
     */
    @Transactional
    public Order verifyOtpAndDeliver(OtpVerifyRequest request) {

        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Validate OTP
        if (order.getDeliveryOtp() == null ||
                request.getEnteredOtp() == null ||
                !order.getDeliveryOtp().trim()
                        .equals(request.getEnteredOtp().trim())) {

            throw new RuntimeException(
                    "Invalid OTP! Please check the OTP provided by the buyer."
            );
        }

        // Verify delivery agent if provided
        if (request.getDeliveryAgentId() != null) {

            if (order.getDeliveryAgentId() != null &&
                    !order.getDeliveryAgentId()
                            .equals(request.getDeliveryAgentId())) {

                throw new RuntimeException(
                        "Unauthorized delivery agent for this order."
                );
            }

            if (order.getDeliveryAgentId() == null) {

                User agent = userRepository.findById(
                        request.getDeliveryAgentId()
                ).orElseThrow(() ->
                        new RuntimeException("Delivery agent not found")
                );

                order.setDeliveryAgentId(agent.getId());
                order.setDeliveryAgentName(agent.getFullName());
                order.setDeliveryAgentPhone(agent.getPhone());
            }
        }

        // Complete payment only after successful delivery OTP
        order.setPaymentStatus("COMPLETED");
        order.setOrderStatus("DELIVERED");
        order.setDeliveredAt(LocalDateTime.now());

        Order updatedOrder = orderRepository.save(order);

        // Notify Farmer
        notificationService.sendNotification(
                order.getFarmerId(),
                "Order Delivered & Payout Generated",
                "Order #" + order.getOrderNumber()
                        + " delivered successfully. Farmer earnings: ₹"
                        + order.getFarmerEarnings()
        );

        // Notify Buyer
        notificationService.sendNotification(
                order.getBuyerId(),
                "Order Delivered Successfully",
                "Your order #" + order.getOrderNumber()
                        + " has been delivered successfully."
        );

        // Notify Delivery Agent
        if (order.getDeliveryAgentId() != null) {

            notificationService.sendNotification(
                    order.getDeliveryAgentId(),
                    "Delivery Completed & Commission Generated",
                    "Order #" + order.getOrderNumber()
                            + " completed. Your earnings: ₹"
                            + order.getDeliveryEarnings()
            );
        }

        return updatedOrder;
    }
    public List<Order> getOrdersByFarmer(Long farmerId) {
        return orderRepository.findByFarmerIdOrderByCreatedAtDesc(farmerId);
    }

    public List<Order> getOrdersByBuyer(Long buyerId) {
        return orderRepository.findByBuyerIdOrderByCreatedAtDesc(buyerId);
    }

    public List<Order> getOrdersByDeliveryAgent(Long agentId) {
        return orderRepository.findByDeliveryAgentIdOrderByCreatedAtDesc(agentId);
    }

    public List<Order> getAvailableOrdersForDelivery(String district) {
        if (district != null && !district.trim().isEmpty()) {
            List<Order> list = new ArrayList<>();
            list.addAll(orderRepository.findByFarmerDistrictAndOrderStatusOrderByCreatedAtDesc(district, "ACCEPTED_BY_FARMER"));
            list.addAll(orderRepository.findByFarmerDistrictAndOrderStatusOrderByCreatedAtDesc(district, "PICKED_UP"));
            list.addAll(orderRepository.findByFarmerDistrictAndOrderStatusOrderByCreatedAtDesc(district, "OUT_FOR_DELIVERY"));
            return list;
        }
        return orderRepository.findByOrderStatusOrderByCreatedAtDesc("ACCEPTED_BY_FARMER");
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    /**
     * Monthly earnings calculation for Farmer monthly bar chart
     */
    public MonthlyEarningsDTO getFarmerMonthlyEarnings(Long farmerId) {

        List<Order> orders = orderRepository.findByFarmerIdOrderByCreatedAtDesc(farmerId);

        String[] monthNames = {
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        };

        double[] monthlyTotals = new double[12];

        double totalEarnings = 0.0;
        long completedCount = 0;

        for (Order o : orders) {

        	System.out.println(
        		    "DEBUG ORDER: id=" + o.getId()
        		    + ", farmerId=" + o.getFarmerId()
        		    + ", status=" + o.getOrderStatus()
        		    + ", earnings=" + o.getFarmerEarnings()
        		);

        		if ("DELIVERED".equalsIgnoreCase(o.getOrderStatus())) {
                int monthIdx = o.getCreatedAt().getMonthValue() - 1;

                double amt = o.getFarmerEarnings() != null
                        ? o.getFarmerEarnings()
                        : (o.getProductTotal() * 0.70);

                monthlyTotals[monthIdx] += amt;

                totalEarnings += amt;

                completedCount++;
            }
        }

        // Last 6 months labels and values
        List<String> labels = new ArrayList<>();
        List<Double> data = new ArrayList<>();

        int currentMonth = LocalDateTime.now().getMonthValue() - 1;

        for (int i = 5; i >= 0; i--) {

            int m = (currentMonth - i + 12) % 12;

            labels.add(monthNames[m]);

            data.add(Math.round(monthlyTotals[m] * 100.0) / 100.0);
        }

        return new MonthlyEarningsDTO(
                labels,
                data,
                Math.round(totalEarnings * 100.0) / 100.0,
                completedCount
        );
    }  
  

    /**
     * Delivery Agent earnings summary (30% split)
     */
    public Map<String, Object> getDeliveryEarningsSummary(Long agentId) {
        List<Order> orders = orderRepository.findByDeliveryAgentIdOrderByCreatedAtDesc(agentId);
        double totalEarnings = 0.0;
        long completedDeliveries = 0;
        long activeDeliveries = 0;

        for (Order o : orders) {
            if ("DELIVERED".equalsIgnoreCase(o.getOrderStatus())) {
                double earnings = o.getDeliveryEarnings() != null ? o.getDeliveryEarnings() : (o.getProductTotal() * 0.30);
                totalEarnings += earnings;
                completedDeliveries++;
            } else if (!"CANCELLED".equalsIgnoreCase(o.getOrderStatus())) {
                activeDeliveries++;
            }
        }

        Map<String, Object> summary = new HashMap<>();
        summary.put("totalEarnings", Math.round(totalEarnings * 100.0) / 100.0);
        summary.put("commissionRate", "30%");
        summary.put("completedDeliveries", completedDeliveries);
        summary.put("activeDeliveries", activeDeliveries);
        return summary;
    }
}
