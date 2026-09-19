package com.agromarket.repository;

import com.agromarket.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByOrderNumber(String orderNumber);
    List<Order> findByFarmerIdOrderByCreatedAtDesc(Long farmerId);
    List<Order> findByBuyerIdOrderByCreatedAtDesc(Long buyerId);
    List<Order> findByDeliveryAgentIdOrderByCreatedAtDesc(Long deliveryAgentId);
    List<Order> findByFarmerDistrictAndOrderStatusOrderByCreatedAtDesc(String district, String orderStatus);
    List<Order> findByOrderStatusOrderByCreatedAtDesc(String orderStatus);
}
