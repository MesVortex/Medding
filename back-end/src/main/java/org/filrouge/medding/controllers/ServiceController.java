package org.filrouge.medding.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.filrouge.medding.dto.requests.ServiceBookingRequestDTO;
import org.filrouge.medding.dto.requests.ServiceRequestDTO;
import org.filrouge.medding.dto.responses.ServiceBookingResponseDTO;
import org.filrouge.medding.dto.responses.ServiceResponseDTO;
import org.filrouge.medding.entities.enums.WeddingServiceCategory;
import org.filrouge.medding.services.interfaces.ServiceService;
import org.filrouge.medding.utils.SecurityUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ServiceController {
    private final ServiceService serviceService;
    private final SecurityUtils securityUtils;

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_VENDOR')")
    public ResponseEntity<ServiceResponseDTO> createService(@Valid @RequestBody ServiceRequestDTO serviceRequestDTO) {
        ServiceResponseDTO createdService = serviceService.createService(serviceRequestDTO);
        return new ResponseEntity<>(createdService, HttpStatus.CREATED);
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ORGANIZER', 'ROLE_ADMIN')")
    public ResponseEntity<List<ServiceResponseDTO>> getAllServices() {
        return ResponseEntity.ok(serviceService.getAllServices());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceResponseDTO> getServiceById(@PathVariable Long id) {
        return ResponseEntity.ok(serviceService.getServiceById(id));
    }

    @GetMapping("/vendor/{vendorId}")
    public ResponseEntity<List<ServiceResponseDTO>> getServicesByVendorId(@PathVariable Long vendorId) {
        return ResponseEntity.ok(serviceService.getServicesByVendorId(vendorId));
    }

    @GetMapping("/vendor/me")
    @PreAuthorize("hasAuthority('ROLE_VENDOR')")
    public ResponseEntity<List<ServiceResponseDTO>> getCurrentVendorServices() {
        return ResponseEntity.ok(serviceService.getCurrentVendorServices());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceResponseDTO> updateService(@PathVariable Long id, @Valid @RequestBody ServiceRequestDTO serviceRequestDTO) {
        return ResponseEntity.ok(serviceService.updateService(id, serviceRequestDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        serviceService.deleteService(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{serviceId}/book")
    @PreAuthorize("hasAuthority('ROLE_ORGANIZER')")
    public ResponseEntity<ServiceBookingResponseDTO> bookService(
            @PathVariable Long serviceId,
            @Valid @RequestBody ServiceBookingRequestDTO bookingRequest) {
        return ResponseEntity.ok(serviceService.bookService(serviceId, bookingRequest));
    }

    @GetMapping("/bookings/wedding/{weddingId}")
    @PreAuthorize("hasAuthority('ROLE_ORGANIZER')")
    public ResponseEntity<List<ServiceBookingResponseDTO>> getWeddingBookings(@PathVariable Long weddingId) {
        return ResponseEntity.ok(serviceService.getWeddingBookings(weddingId));
    }

    @GetMapping("/bookings/vendor")
    @PreAuthorize("hasAuthority('ROLE_VENDOR')")
    public ResponseEntity<List<ServiceBookingResponseDTO>> getVendorBookings() {
        return ResponseEntity.ok(serviceService.getVendorBookings(securityUtils.getCurrentUserId()));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<ServiceResponseDTO>> getServicesByCategory(
            @PathVariable WeddingServiceCategory category) {
        return ResponseEntity.ok(serviceService.getServicesByCategory(category));
    }

    @PutMapping("/bookings/{bookingId}/confirm")
    @PreAuthorize("hasAuthority('ROLE_VENDOR')")
    public ResponseEntity<Void> confirmBooking(@PathVariable Long bookingId) {
        serviceService.confirmBooking(bookingId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/bookings/{bookingId}/cancel")
    @PreAuthorize("hasAuthority('ROLE_VENDOR')")
    public ResponseEntity<Void> cancelBooking(@PathVariable Long bookingId) {
        serviceService.cancelBooking(bookingId);
        return ResponseEntity.ok().build();
    }
}