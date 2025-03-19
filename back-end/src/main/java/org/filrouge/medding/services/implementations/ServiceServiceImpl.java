package org.filrouge.medding.services.implementations;

import lombok.RequiredArgsConstructor;
import org.filrouge.medding.dto.requests.ServiceBookingRequestDTO;
import org.filrouge.medding.dto.requests.ServiceRequestDTO;
import org.filrouge.medding.dto.responses.ServiceBookingResponseDTO;
import org.filrouge.medding.dto.responses.ServiceResponseDTO;
import org.filrouge.medding.entities.Service;
import org.filrouge.medding.entities.ServiceBooking;
import org.filrouge.medding.entities.Vendor;
import org.filrouge.medding.entities.Wedding;
import org.filrouge.medding.entities.enums.ServiceBookingStatus;
import org.filrouge.medding.entities.enums.WeddingServiceCategory;
import org.filrouge.medding.exceptions.ResourceNotFoundException;
import org.filrouge.medding.exceptions.UnauthorizedException;
import org.filrouge.medding.mappers.BookingMapper;
import org.filrouge.medding.mappers.ServiceMapper;
import org.filrouge.medding.repositories.ServiceBookingRepository;
import org.filrouge.medding.repositories.ServiceRepository;
import org.filrouge.medding.repositories.VendorRepository;
import org.filrouge.medding.repositories.WeddingRepository;
import org.filrouge.medding.services.interfaces.ServiceService;
import org.filrouge.medding.utils.SecurityUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class ServiceServiceImpl implements ServiceService {
    private final ServiceRepository serviceRepository;
    private final VendorRepository vendorRepository;
    private final ServiceBookingRepository serviceBookingRepository;
    private final ServiceMapper serviceMapper;
    private final SecurityUtils securityUtils;
    private final BookingMapper bookingMapper;
    private final WeddingRepository weddingRepository;

    @Override
    public ServiceResponseDTO createService(ServiceRequestDTO serviceRequestDTO) {
        try {
            // Get current user ID from the JWT token
            Long currentUserId = securityUtils.getCurrentUserId();

            Vendor vendor = vendorRepository.findById(currentUserId)
                    .orElseThrow(() -> new ResourceNotFoundException("Vendor not found with id: " + currentUserId));

            Service service = serviceMapper.serviceRequestDTOToService(serviceRequestDTO);
            service.setVendor(vendor);

            Service savedService = serviceRepository.save(service);
            return serviceMapper.serviceToServiceResponseDTO(savedService);
        } catch (Exception e) {
            throw new RuntimeException("Error creating service: " + e.getMessage());
        }
    }

    @Override
    public List<ServiceResponseDTO> getAllServices() {
        return serviceRepository.findAll().stream()
                .map(serviceMapper::serviceToServiceResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ServiceResponseDTO getServiceById(Long id) {
        return serviceRepository.findById(id)
                .map(serviceMapper::serviceToServiceResponseDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found"));
    }

    @Override
    public List<ServiceResponseDTO> getCurrentVendorServices() {
        // Get current user ID from the JWT token
        Long currentUserId = securityUtils.getCurrentUserId();

        // Verify the user is a vendor
        Vendor vendor = vendorRepository.findById(currentUserId)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor not found with id: " + currentUserId));

        // Get all services for the current vendor
        return serviceRepository.findByVendorId(currentUserId).stream()
                .map(serviceMapper::serviceToServiceResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ServiceResponseDTO> getServicesByVendorId(Long vendorId) {
        return serviceRepository.findByVendorId(vendorId).stream()
                .map(serviceMapper::serviceToServiceResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ServiceResponseDTO updateService(Long id, ServiceRequestDTO serviceRequestDTO) {
        Long currentUserId = securityUtils.getCurrentUserId();

        Service service = serviceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found"));

        // Check if the current vendor owns this service
        if (!service.getVendor().getId().equals(currentUserId)) {
            throw new UnauthorizedException("You can only update your own services");
        }

        service.setTitle(serviceRequestDTO.getTitle());
        service.setDescription(serviceRequestDTO.getDescription());
        service.setPrice(serviceRequestDTO.getPrice());
        service.setAvailability(serviceRequestDTO.getAvailability());
        // Add this line to update the category
        service.setCategory(serviceRequestDTO.getCategory());

        Service updatedService = serviceRepository.save(service);
        return serviceMapper.serviceToServiceResponseDTO(updatedService);
    }

    @Override
    public void deleteService(Long id) {
        if (!serviceRepository.existsById(id)) {
            throw new ResourceNotFoundException("Service not found");
        }
        serviceRepository.deleteById(id);
    }

    @Override
    public ServiceBookingResponseDTO bookService(Long serviceId, ServiceBookingRequestDTO bookingRequest) {
        Long currentUserId = securityUtils.getCurrentUserId();

        Service service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new ResourceNotFoundException("Service not found"));

        Wedding wedding = weddingRepository.findById(bookingRequest.getWeddingId())
                .orElseThrow(() -> new ResourceNotFoundException("Wedding not found"));

        // Check if the wedding belongs to the current organizer
        if (!wedding.getOrganizer().getId().equals(currentUserId)) {
            throw new UnauthorizedException("You can only book services for your own weddings");
        }

        // Check if service is available
        if (!service.getAvailability()) {
            throw new IllegalStateException("Service is not available for booking");
        }

        // Check if service is already booked for this wedding
        if (serviceBookingRepository.existsByServiceIdAndWeddingIdAndStatusNot(
                serviceId, bookingRequest.getWeddingId(), ServiceBookingStatus.CANCELLED)) {
            throw new IllegalStateException("This service is already booked for this wedding");
        }

        ServiceBooking booking = new ServiceBooking();
        booking.setService(service);
        booking.setWedding(wedding);
        booking.setBookedAt(LocalDateTime.now());
        booking.setStatus(ServiceBookingStatus.PENDING);

        ServiceBooking savedBooking = serviceBookingRepository.save(booking);
        return bookingMapper.bookingToBookingResponseDTO(savedBooking);
    }

    @Override
    public List<ServiceBookingResponseDTO> getWeddingBookings(Long weddingId) {
        return serviceBookingRepository.findByWeddingId(weddingId).stream()
                .map(bookingMapper::bookingToBookingResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ServiceBookingResponseDTO> getVendorBookings(Long vendorId) {
        return serviceBookingRepository.findByServiceVendorId(vendorId).stream()
                .map(bookingMapper::bookingToBookingResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ServiceResponseDTO> getServicesByCategory(WeddingServiceCategory category) {
        return serviceRepository.findByCategory(category).stream()
                .map(serviceMapper::serviceToServiceResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void confirmBooking(Long bookingId) {
        Long currentUserId = securityUtils.getCurrentUserId();
        ServiceBooking booking = serviceBookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        // Check if the service belongs to the current vendor
        if (!booking.getService().getVendor().getId().equals(currentUserId)) {
            throw new UnauthorizedException("You can only manage your own service bookings");
        }

        // Check if booking is still pending
        if (booking.getStatus() != ServiceBookingStatus.PENDING) {
            throw new IllegalStateException("Only pending bookings can be confirmed");
        }

        // Check if service is not already booked
        if (!booking.getService().getAvailability()) {
            throw new IllegalStateException("Service is no longer available");
        }

        // Update service availability
        Service service = booking.getService();
        service.setAvailability(false);
        serviceRepository.save(service);

        // Confirm booking
        booking.setStatus(ServiceBookingStatus.CONFIRMED);
        serviceBookingRepository.save(booking);

        // Cancel other pending bookings for this service
        List<ServiceBooking> otherPendingBookings = serviceBookingRepository
                .findByServiceIdAndStatus(service.getId(), ServiceBookingStatus.PENDING);

        otherPendingBookings.stream()
                .filter(b -> !b.getId().equals(bookingId))
                .forEach(b -> {
                    b.setStatus(ServiceBookingStatus.CANCELLED);
                    serviceBookingRepository.save(b);
                });
    }

    @Override
    public void cancelBooking(Long bookingId) {
        Long currentUserId = securityUtils.getCurrentUserId();
        ServiceBooking booking = serviceBookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        if (!booking.getService().getVendor().getId().equals(currentUserId)) {
            throw new UnauthorizedException("You can only manage your own service bookings");
        }

        if (booking.getStatus() != ServiceBookingStatus.PENDING) {
            throw new IllegalStateException("Only pending bookings can be cancelled");
        }

        booking.setStatus(ServiceBookingStatus.CANCELLED);
        serviceBookingRepository.save(booking);
    }
}