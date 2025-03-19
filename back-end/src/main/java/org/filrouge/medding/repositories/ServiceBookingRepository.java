package org.filrouge.medding.repositories;

import org.filrouge.medding.entities.ServiceBooking;
import org.filrouge.medding.entities.enums.ServiceBookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceBookingRepository extends JpaRepository<ServiceBooking, Long> {
    List<ServiceBooking> findByWeddingId(Long weddingId);
    List<ServiceBooking> findByServiceVendorId(Long vendorId);
    boolean existsByServiceIdAndWeddingIdAndStatusNot(Long serviceId, Long weddingId, ServiceBookingStatus status);
    List<ServiceBooking> findByServiceIdAndStatus(Long serviceId, ServiceBookingStatus status);
}
