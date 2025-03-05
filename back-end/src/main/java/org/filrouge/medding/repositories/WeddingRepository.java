package org.filrouge.medding.repositories;

import org.filrouge.medding.entities.Wedding;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WeddingRepository extends JpaRepository<Wedding, Long> {
    Optional<Wedding> findById(Long id);
    List<Wedding> findByOrganizerId(Long organizerId);
}
