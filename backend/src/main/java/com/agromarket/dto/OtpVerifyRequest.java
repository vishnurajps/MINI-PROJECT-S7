package com.agromarket.dto;

public class OtpVerifyRequest {
    private Long orderId;
    private Long deliveryAgentId;
    private String enteredOtp;

    public OtpVerifyRequest() {}

    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }

    public Long getDeliveryAgentId() { return deliveryAgentId; }
    public void setDeliveryAgentId(Long deliveryAgentId) { this.deliveryAgentId = deliveryAgentId; }

    public String getEnteredOtp() { return enteredOtp; }
    public void setEnteredOtp(String enteredOtp) { this.enteredOtp = enteredOtp; }
}
