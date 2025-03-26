package org.filrouge.medding.services.implementations;

import lombok.RequiredArgsConstructor;
import org.filrouge.medding.dto.responses.VendorProfileDTO;
import org.filrouge.medding.entities.Vendor;
import org.filrouge.medding.exceptions.ResourceNotFoundException;
import org.filrouge.medding.mappers.UserMapper;
import org.filrouge.medding.repositories.VendorRepository;
import org.filrouge.medding.services.interfaces.VendorService;
import org.filrouge.medding.utils.SecurityUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VendorServiceImpl implements VendorService {

    private final VendorRepository vendorRepository;
    private final UserMapper userMapper;

    @Override
    public List<VendorProfileDTO> getAllVendors() {
        return vendorRepository.findAll().stream()
                .map(userMapper::vendorToVendorProfileDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<VendorProfileDTO> getPendingVendors() {
        return vendorRepository.findByVerifiedFalse().stream()
                .map(userMapper::vendorToVendorProfileDTO)
                .collect(Collectors.toList());
    }

    @Override
    public VendorProfileDTO verifyVendor(Long id) {
        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor not found"));
        vendor.setVerified(true);
        vendor.setVerifiedAt(LocalDateTime.now());
        return userMapper.vendorToVendorProfileDTO(vendorRepository.save(vendor));
    }

    @Override
    public VendorProfileDTO unverifyVendor(Long id) {
        Vendor vendor = vendorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor not found"));
        vendor.setVerified(false);
        vendor.setVerifiedAt(null);
        return userMapper.vendorToVendorProfileDTO(vendorRepository.save(vendor));
    }

    @Override
    public void deleteVendor(Long id) {
        if (!vendorRepository.existsById(id)) {
            throw new ResourceNotFoundException("Vendor not found");
        }
        vendorRepository.deleteById(id);
    }
}
