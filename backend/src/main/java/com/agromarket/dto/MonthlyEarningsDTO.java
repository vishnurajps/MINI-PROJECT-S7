package com.agromarket.dto;

import java.util.List;

public class MonthlyEarningsDTO {
    private List<String> labels; // e.g., ["Apr", "May", "Jun", "Jul", "Aug", "Sep"]
    private List<Double> data;   // e.g., [1200.0, 3400.0, ...]
    private Double totalEarnings;
    private Long completedOrdersCount;

    public MonthlyEarningsDTO() {}

    public MonthlyEarningsDTO(List<String> labels, List<Double> data, Double totalEarnings, Long completedOrdersCount) {
        this.labels = labels;
        this.data = data;
        this.totalEarnings = totalEarnings;
        this.completedOrdersCount = completedOrdersCount;
    }

    public List<String> getLabels() { return labels; }
    public void setLabels(List<String> labels) { this.labels = labels; }

    public List<Double> getData() { return data; }
    public void setData(List<Double> data) { this.data = data; }

    public Double getTotalEarnings() { return totalEarnings; }
    public void setTotalEarnings(Double totalEarnings) { this.totalEarnings = totalEarnings; }

    public Long getCompletedOrdersCount() { return completedOrdersCount; }
    public void setCompletedOrdersCount(Long completedOrdersCount) { this.completedOrdersCount = completedOrdersCount; }
}
