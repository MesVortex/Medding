package org.filrouge.medding.repositories;

import org.filrouge.medding.entities.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {
    Optional<Vendor> findById(Long id);
    List<Vendor> findByVerifiedFalse();
    long countByVerifiedTrue();
    long countByVerifiedFalse();

    @Query("SELECT v.location as location, COUNT(v) as count FROM Vendor v GROUP BY v.location")
    Map<String, Long> countByLocationGrouped();
}
