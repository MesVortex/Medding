package org.filrouge.medding.services.interfaces;

import org.filrouge.medding.dto.responses.VendorProfileDTO;

import java.util.List;

public interface VendorService {
    VendorProfileDTO verifyVendor(Long id);
    VendorProfileDTO unverifyVendor(Long id);
    List<VendorProfileDTO> getPendingVendors();
}
