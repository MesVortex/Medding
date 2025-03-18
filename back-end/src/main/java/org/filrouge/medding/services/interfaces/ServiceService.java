package org.filrouge.medding.services.interfaces;

import org.filrouge.medding.dto.requests.ServiceBookingRequestDTO;
import org.filrouge.medding.dto.requests.ServiceRequestDTO;
import org.filrouge.medding.dto.responses.ServiceBookingResponseDTO;
import org.filrouge.medding.dto.responses.ServiceResponseDTO;

import java.util.List;

public interface ServiceService {
    ServiceResponseDTO createService(ServiceRequestDTO serviceRequestDTO);
    List<ServiceResponseDTO> getAllServices();
    ServiceResponseDTO getServiceById(Long id);
    List<ServiceResponseDTO> getServicesByVendorId(Long vendorId);
    ServiceResponseDTO updateService(Long id, ServiceRequestDTO serviceRequestDTO);
    void deleteService(Long id);
    List<ServiceResponseDTO> getCurrentVendorServices();
    ServiceBookingResponseDTO bookService(Long serviceId, ServiceBookingRequestDTO bookingRequest);
    List<ServiceBookingResponseDTO> getWeddingBookings(Long weddingId);
    List<ServiceBookingResponseDTO> getVendorBookings(Long vendorId);
}
