package org.filrouge.medding.repositories;

import org.filrouge.medding.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByVendorId(Long vendorId);
    Optional<Review> findByVendorIdAndOrganizerId(Long vendorId, Long organizerId);
}
