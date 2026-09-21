package com.agromarket.controller;

import com.agromarket.dto.MonthlyEarningsDTO;
import com.agromarket.dto.OrderCreateRequest;
import com.agromarket.dto.OtpVerifyRequest;
import com.agromarket.model.Order;
import com.agromarket.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<?> placeOrder(@RequestBody OrderCreateRequest request) {
        try {
            Order order = orderService.placeOrder(request);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Farmer confirms order and inventory quantity is automatically reduced
     */
    @PostMapping("/{id}/accept")
    public ResponseEntity<?> acceptOrder(@PathVariable Long id, @RequestParam Long farmerId) {
        try {
            Order order = orderService.farmerAcceptOrder(id, farmerId);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Confirms UPI payment only when UTR is provided
     * and generates the secure delivery OTP.
     */
    @PostMapping("/{id}/confirm-payment")
    public ResponseEntity<?> confirmPayment(
            @PathVariable Long id,
            @RequestParam(required = false, defaultValue = "UPI")
            String paymentMethod,
            @RequestParam(required = false)
            String transactionRef) {

        try {

            // UTR is mandatory for UPI payments
            if ("UPI".equalsIgnoreCase(paymentMethod)) {

                if (transactionRef == null ||
                        transactionRef.trim().isEmpty()) {

                    return ResponseEntity.badRequest()
                            .body(Map.of(
                                    "error",
                                    "Unique Transaction Reference (UTR) is mandatory."
                            ));
                }

                transactionRef = transactionRef.trim();

                if (transactionRef.length() < 6 ||
                        transactionRef.length() > 50) {

                    return ResponseEntity.badRequest()
                            .body(Map.of(
                                    "error",
                                    "Please enter a valid UTR number."
                            ));
                }
            }

            Order order = orderService.confirmPaymentAndGenerateOtp(
                    id,
                    paymentMethod,
                    transactionRef
            );

            return ResponseEntity.ok(order);

        } catch (Exception e) {

            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Delivery agent updates status (e.g., PICKED_UP, OUT_FOR_DELIVERY)
     */
    @PostMapping("/{id}/delivery-status")
    public ResponseEntity<?> updateDeliveryStatus(
            @PathVariable Long id,
            @RequestParam Long agentId,
            @RequestParam String status) {
        try {
            Order order = orderService.updateDeliveryStatus(id, agentId, status);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Delivery agent enters buyer's OTP to confirm delivery:
     * - Order transitions to DELIVERED
     * - 70% farmer earnings & 30% delivery agent earnings finalized
     */
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtpAndDeliver(@RequestBody OtpVerifyRequest request) {
        try {
            Order order = orderService.verifyOtpAndDeliver(request);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/farmer/{farmerId}")
    public ResponseEntity<List<Order>> getOrdersByFarmer(@PathVariable Long farmerId) {
        return ResponseEntity.ok(orderService.getOrdersByFarmer(farmerId));
    }

    @GetMapping("/buyer/{buyerId}")
    public ResponseEntity<List<Order>> getOrdersByBuyer(@PathVariable Long buyerId) {
        return ResponseEntity.ok(orderService.getOrdersByBuyer(buyerId));
    }

    @GetMapping("/delivery/{agentId}")
    public ResponseEntity<List<Order>> getOrdersByDeliveryAgent(@PathVariable Long agentId) {
        return ResponseEntity.ok(orderService.getOrdersByDeliveryAgent(agentId));
    }

    @GetMapping("/available-deliveries")
    public ResponseEntity<List<Order>> getAvailableDeliveries(@RequestParam(required = false) String district) {
        return ResponseEntity.ok(orderService.getAvailableOrdersForDelivery(district));
    }

    /**
     * Farmer monthly earnings for Chart.js bar chart
     */
    @GetMapping("/farmer-earnings-chart/{farmerId}")
    public ResponseEntity<MonthlyEarningsDTO> getFarmerEarningsChart(@PathVariable Long farmerId) {
        return ResponseEntity.ok(orderService.getFarmerMonthlyEarnings(farmerId));
    }

    /**
     * Delivery Agent 30% commission payout breakdown
     */
    @GetMapping("/delivery-earnings-summary/{agentId}")
    public ResponseEntity<Map<String, Object>> getDeliveryEarningsSummary(@PathVariable Long agentId) {
        return ResponseEntity.ok(orderService.getDeliveryEarningsSummary(agentId));
    }
    
    @PostMapping("/{id}/confirm-cod-payment")
    public ResponseEntity<?> confirmCodPayment(
            @PathVariable Long id,
            @RequestParam Long agentId) {

        try {
            Order order = orderService.confirmCodPayment(id, agentId);
            return ResponseEntity.ok(order);

        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }
}
