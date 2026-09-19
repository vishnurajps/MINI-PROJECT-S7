package com.agromarket.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String orderNumber;

    @Column(nullable = false)
    private Long buyerId;
    private String buyerName;
    private String buyerPhone;

    @Column(nullable = false)
    private Long farmerId;
    private String farmerName;
    private String farmerPhone;
    private String farmerUpiId;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String farmerQrCodeUrl;

    private Long deliveryAgentId;
    private String deliveryAgentName;
    private String deliveryAgentPhone;

    // Financial Breakdown
    @Column(nullable = false)
    private Double productTotal;

    private Double gstAmount = 0.0;        // 5% GST
    private Double deliveryCharge = 40.0;  // Standard ₹40
    private Double platformCharge = 15.0;  // Standard ₹15

    @Column(nullable = false)
    private Double grandTotal;

    // Split: 70% to Farmer, 30% to Delivery Agent
    private Double farmerEarnings;
    private Double deliveryEarnings;

    @Column(nullable = false)
    private String paymentMethod; // "UPI", "COD"

    private String paymentStatus = "PENDING"; // "PENDING", "PAID"

    // Order Lifecycle: PLACED, ACCEPTED_BY_FARMER, PICKED_UP, OUT_FOR_DELIVERY, DELIVERED, CANCELLED
    private String orderStatus = "PLACED";

    // 6-digit OTP generated only after payment is completed
    @Column(nullable = true)
    private String deliveryOtp;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String deliveryAddress;

    private String farmerDistrict;
    private String buyerDistrict;

    private String farmerMapsQuery;
    private String buyerMapsQuery;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime deliveredAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<OrderItem> items = new ArrayList<>();

    public Order() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getOrderNumber() { return orderNumber; }
    public void setOrderNumber(String orderNumber) { this.orderNumber = orderNumber; }

    public Long getBuyerId() { return buyerId; }
    public void setBuyerId(Long buyerId) { this.buyerId = buyerId; }

    public String getBuyerName() { return buyerName; }
    public void setBuyerName(String buyerName) { this.buyerName = buyerName; }

    public String getBuyerPhone() { return buyerPhone; }
    public void setBuyerPhone(String buyerPhone) { this.buyerPhone = buyerPhone; }

    public Long getFarmerId() { return farmerId; }
    public void setFarmerId(Long farmerId) { this.farmerId = farmerId; }

    public String getFarmerName() { return farmerName; }
    public void setFarmerName(String farmerName) { this.farmerName = farmerName; }

    public String getFarmerPhone() { return farmerPhone; }
    public void setFarmerPhone(String farmerPhone) { this.farmerPhone = farmerPhone; }

    public String getFarmerUpiId() { return farmerUpiId; }
    public void setFarmerUpiId(String farmerUpiId) { this.farmerUpiId = farmerUpiId; }

    public String getFarmerQrCodeUrl() { return farmerQrCodeUrl; }
    public void setFarmerQrCodeUrl(String farmerQrCodeUrl) { this.farmerQrCodeUrl = farmerQrCodeUrl; }

    public Long getDeliveryAgentId() { return deliveryAgentId; }
    public void setDeliveryAgentId(Long deliveryAgentId) { this.deliveryAgentId = deliveryAgentId; }

    public String getDeliveryAgentName() { return deliveryAgentName; }
    public void setDeliveryAgentName(String deliveryAgentName) { this.deliveryAgentName = deliveryAgentName; }

    public String getDeliveryAgentPhone() { return deliveryAgentPhone; }
    public void setDeliveryAgentPhone(String deliveryAgentPhone) { this.deliveryAgentPhone = deliveryAgentPhone; }

    public Double getProductTotal() { return productTotal; }
    public void setProductTotal(Double productTotal) { this.productTotal = productTotal; }

    public Double getGstAmount() { return gstAmount; }
    public void setGstAmount(Double gstAmount) { this.gstAmount = gstAmount; }

    public Double getDeliveryCharge() { return deliveryCharge; }
    public void setDeliveryCharge(Double deliveryCharge) { this.deliveryCharge = deliveryCharge; }

    public Double getPlatformCharge() { return platformCharge; }
    public void setPlatformCharge(Double platformCharge) { this.platformCharge = platformCharge; }

    public Double getGrandTotal() { return grandTotal; }
    public void setGrandTotal(Double grandTotal) { this.grandTotal = grandTotal; }

    public Double getFarmerEarnings() { return farmerEarnings; }
    public void setFarmerEarnings(Double farmerEarnings) { this.farmerEarnings = farmerEarnings; }

    public Double getDeliveryEarnings() { return deliveryEarnings; }
    public void setDeliveryEarnings(Double deliveryEarnings) { this.deliveryEarnings = deliveryEarnings; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public String getOrderStatus() { return orderStatus; }
    public void setOrderStatus(String orderStatus) { this.orderStatus = orderStatus; }

    public String getDeliveryOtp() { return deliveryOtp; }
    public void setDeliveryOtp(String deliveryOtp) { this.deliveryOtp = deliveryOtp; }

    public String getDeliveryAddress() { return deliveryAddress; }
    public void setDeliveryAddress(String deliveryAddress) { this.deliveryAddress = deliveryAddress; }

    public String getFarmerDistrict() { return farmerDistrict; }
    public void setFarmerDistrict(String farmerDistrict) { this.farmerDistrict = farmerDistrict; }

    public String getBuyerDistrict() { return buyerDistrict; }
    public void setBuyerDistrict(String buyerDistrict) { this.buyerDistrict = buyerDistrict; }

    public String getFarmerMapsQuery() { return farmerMapsQuery; }
    public void setFarmerMapsQuery(String farmerMapsQuery) { this.farmerMapsQuery = farmerMapsQuery; }

    public String getBuyerMapsQuery() { return buyerMapsQuery; }
    public void setBuyerMapsQuery(String buyerMapsQuery) { this.buyerMapsQuery = buyerMapsQuery; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getDeliveredAt() { return deliveredAt; }
    public void setDeliveredAt(LocalDateTime deliveredAt) { this.deliveredAt = deliveredAt; }

    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }

    public void addItem(OrderItem item) {
        items.add(item);
        item.setOrder(this);
    }
}
