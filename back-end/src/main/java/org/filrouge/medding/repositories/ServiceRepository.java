package org.filrouge.medding.repositories;

import org.filrouge.medding.entities.Service;
import org.filrouge.medding.entities.enums.WeddingServiceCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceRepository extends JpaRepository<Service, Long> {
    List<Service> findByVendorId(Long vendorId);
    List<Service> findByCategory(WeddingServiceCategory category);
}
