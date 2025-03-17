package org.filrouge.medding.services.implementations;

import lombok.RequiredArgsConstructor;
import org.filrouge.medding.dto.requests.ServiceRequestDTO;
import org.filrouge.medding.dto.responses.ServiceResponseDTO;
import org.filrouge.medding.entities.Service;
import org.filrouge.medding.entities.Vendor;
import org.filrouge.medding.exceptions.ResourceNotFoundException;
import org.filrouge.medding.exceptions.UnauthorizedException;
import org.filrouge.medding.mappers.ServiceMapper;
import org.filrouge.medding.repositories.ServiceRepository;
import org.filrouge.medding.repositories.VendorRepository;
import org.filrouge.medding.services.interfaces.ServiceService;
import org.filrouge.medding.utils.SecurityUtils;

import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class ServiceServiceImpl implements ServiceService {
    private final ServiceRepository serviceRepository;
    private final VendorRepository vendorRepository;
    private final ServiceMapper serviceMapper;
    private final SecurityUtils securityUtils;

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
}
