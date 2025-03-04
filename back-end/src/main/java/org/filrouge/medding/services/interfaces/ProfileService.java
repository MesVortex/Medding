package org.filrouge.medding.services.interfaces;

import org.filrouge.medding.dto.responses.VendorProfileDTO;
import org.filrouge.medding.dto.responses.UserResponseDTO;

public interface ProfileService {
    VendorProfileDTO getVendorProfile(Long id);
    UserResponseDTO getUserProfile(Long id);
}
