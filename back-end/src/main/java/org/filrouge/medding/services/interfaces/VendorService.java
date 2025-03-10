package org.filrouge.medding.services.interfaces;

import org.filrouge.medding.dto.responses.VendorProfileDTO;

import java.util.List;

public interface VendorService {
    List<VendorProfileDTO> getAllVendors();
    List<VendorProfileDTO> getPendingVendors();
    VendorProfileDTO verifyVendor(Long id);
    VendorProfileDTO unverifyVendor(Long id);
    void deleteVendor(Long id);
}
