package com.agromarket.dto;

public class OrderItemRequest {
    private Long productId;
    private Double quantity; // kg or units

    public OrderItemRequest() {}

    public OrderItemRequest(Long productId, Double quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public Double getQuantity() { return quantity; }
    public void setQuantity(Double quantity) { this.quantity = quantity; }
}
