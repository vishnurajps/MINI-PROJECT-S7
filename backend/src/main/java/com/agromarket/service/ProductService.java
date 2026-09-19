package com.agromarket.service;

import com.agromarket.model.Product;
import com.agromarket.model.User;
import com.agromarket.repository.ProductRepository;
import com.agromarket.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public ProductService(ProductRepository productRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    public Product createProduct(Product product) {
        User farmer = userRepository.findById(product.getFarmerId())
                .orElseThrow(() -> new RuntimeException("Farmer not found"));
        product.setFarmerName(farmer.getFullName());
        if (product.getDistrict() == null || product.getDistrict().isEmpty()) {
            product.setDistrict(farmer.getDistrict());
        }
        product.setIsActive(true);
        product.setCreatedAt(LocalDateTime.now());
        product.setUpdatedAt(LocalDateTime.now());
        return productRepository.save(product);
    }

    public Product updateProduct(Long productId, Product updatedData) {
        return productRepository.findById(productId).map(product -> {
            if (updatedData.getName() != null) product.setName(updatedData.getName());
            if (updatedData.getCategory() != null) product.setCategory(updatedData.getCategory());
            if (updatedData.getPricePerUnit() != null) product.setPricePerUnit(updatedData.getPricePerUnit());
            if (updatedData.getUnit() != null) product.setUnit(updatedData.getUnit());
            if (updatedData.getQuantityAvailable() != null) product.setQuantityAvailable(updatedData.getQuantityAvailable());
            if (updatedData.getDescription() != null) product.setDescription(updatedData.getDescription());
            if (updatedData.getImageUrl() != null) product.setImageUrl(updatedData.getImageUrl());
            if (updatedData.getDistrict() != null) product.setDistrict(updatedData.getDistrict());
            if (updatedData.getIsActive() != null) product.setIsActive(updatedData.getIsActive());
            product.setUpdatedAt(LocalDateTime.now());
            return productRepository.save(product);
        }).orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));
    }

    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }

    public Optional<Product> getProductById(Long productId) {
        return productRepository.findById(productId);
    }

    public List<Product> getProductsByFarmer(Long farmerId) {
        return productRepository.findByFarmerId(farmerId);
    }

    public List<Product> getAllActiveProducts(String district, String category) {
        if (district != null && !district.trim().isEmpty() && category != null && !category.trim().isEmpty()) {
            return productRepository.findByDistrictIgnoreCaseAndCategoryIgnoreCaseAndIsActiveTrue(district.trim(), category.trim());
        } else if (district != null && !district.trim().isEmpty()) {
            return productRepository.findByDistrictIgnoreCaseAndIsActiveTrue(district.trim());
        } else if (category != null && !category.trim().isEmpty()) {
            return productRepository.findByCategoryIgnoreCaseAndIsActiveTrue(category.trim());
        } else {
            return productRepository.findByIsActiveTrue();
        }
    }

    public void reduceStock(Long productId, Double orderedQuantity) {
        productRepository.findById(productId).ifPresent(p -> {
            double newQty = p.getQuantityAvailable() - orderedQuantity;
            p.setQuantityAvailable(Math.max(0.0, newQty));
            if (p.getQuantityAvailable() <= 0.0) {
                // optionally keep active or mark inactive when out of stock
            }
            p.setUpdatedAt(LocalDateTime.now());
            productRepository.save(p);
        });
    }
}
