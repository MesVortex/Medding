package org.filrouge.medding.services.interfaces;

import org.filrouge.medding.dto.requests.ProfileUpdateDTO;
import org.filrouge.medding.dto.responses.VendorProfileDTO;
import org.filrouge.medding.dto.responses.UserResponseDTO;
import org.filrouge.medding.exceptions.UserAlreadyExistsException;

public interface ProfileService {
    VendorProfileDTO getVendorProfile(Long id);
    UserResponseDTO getUserProfile(Long id);
    UserResponseDTO updateUserProfile(Long id, ProfileUpdateDTO profileUpdateDTO) throws UserAlreadyExistsException;
    VendorProfileDTO updateVendorProfile(Long id, ProfileUpdateDTO profileUpdateDTO) throws UserAlreadyExistsException;
    void updatePassword(Long userId, String currentPassword, String newPassword);
}
