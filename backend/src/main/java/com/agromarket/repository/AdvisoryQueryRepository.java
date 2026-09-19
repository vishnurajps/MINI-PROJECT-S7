package com.agromarket.repository;

import com.agromarket.model.AdvisoryQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdvisoryQueryRepository extends JpaRepository<AdvisoryQuery, Long> {
    List<AdvisoryQuery> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<AdvisoryQuery> findAllByOrderByCreatedAtDesc();
    List<AdvisoryQuery> findByStatusOrderByCreatedAtDesc(String status);
    List<AdvisoryQuery> findByDistrictOrderByCreatedAtDesc(String district);
}
