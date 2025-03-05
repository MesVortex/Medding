package org.filrouge.medding.repositories;

import org.filrouge.medding.entities.Guest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GuestRepository extends JpaRepository<Guest, Long> {
    List<Guest> findByWeddingId(Long weddingId);
}
