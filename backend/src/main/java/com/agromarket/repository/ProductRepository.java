package com.agromarket.repository;

import com.agromarket.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByFarmerId(Long farmerId);
    List<Product> findByDistrictIgnoreCaseAndIsActiveTrue(String district);
    List<Product> findByIsActiveTrue();
    List<Product> findByCategoryIgnoreCaseAndIsActiveTrue(String category);
    List<Product> findByDistrictIgnoreCaseAndCategoryIgnoreCaseAndIsActiveTrue(String district, String category);
}
