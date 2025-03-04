package org.filrouge.medding.services.implementations;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.filrouge.medding.dto.requests.ProfileUpdateDTO;
import org.filrouge.medding.dto.responses.VendorProfileDTO;
import org.filrouge.medding.dto.responses.UserResponseDTO;
import org.filrouge.medding.entities.User;
import org.filrouge.medding.entities.Vendor;
import org.filrouge.medding.exceptions.ResourceNotFoundException;
import org.filrouge.medding.exceptions.UnauthorizedException;
import org.filrouge.medding.exceptions.UserAlreadyExistsException;
import org.filrouge.medding.mappers.UserMapper;
import org.filrouge.medding.repositories.UserRepository;
import org.filrouge.medding.services.interfaces.ProfileService;
import org.filrouge.medding.utils.SecurityUtils;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final SecurityUtils securityUtils;

    @Override
    public VendorProfileDTO getVendorProfile(Long id) {
        Vendor vendor = userRepository.findById(id)
                .filter(user -> user instanceof Vendor)
                .map(user -> (Vendor) user)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor not found with id: " + id));

        return userMapper.vendorToVendorProfileDTO(vendor);
    }

    @Override
    public UserResponseDTO getUserProfile(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        return userMapper.userToUserResponseDTO(user);
    }

    @Override
    @Transactional
    public UserResponseDTO updateUserProfile(Long id, ProfileUpdateDTO profileUpdateDTO) throws UserAlreadyExistsException {
        // Verify the user is updating their own profile
        Long currentUserId = securityUtils.getCurrentUserId();
        if (!currentUserId.equals(id)) {
            throw new UnauthorizedException("You can only update your own profile");
        }

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        // Check if email is being changed and if it's already taken
        if (!user.getEmail().equals(profileUpdateDTO.getEmail()) &&
                userRepository.existsByEmail(profileUpdateDTO.getEmail())) {
            throw new UserAlreadyExistsException("Email already in use");
        }

        userMapper.updateUserFromDTO(profileUpdateDTO, user);
        User updatedUser = userRepository.save(user);
        return userMapper.userToUserResponseDTO(updatedUser);
    }

    @Override
    @Transactional
    public VendorProfileDTO updateVendorProfile(Long id, ProfileUpdateDTO profileUpdateDTO) throws UserAlreadyExistsException {
        // Verify the vendor is updating their own profile
        Long currentUserId = securityUtils.getCurrentUserId();
        if (!currentUserId.equals(id)) {
            throw new UnauthorizedException("You can only update your own profile");
        }

        Vendor vendor = userRepository.findById(id)
                .filter(user -> user instanceof Vendor)
                .map(user -> (Vendor) user)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor not found with id: " + id));

        // Check if email is being changed and if it's already taken
        if (!vendor.getEmail().equals(profileUpdateDTO.getEmail()) &&
                userRepository.existsByEmail(profileUpdateDTO.getEmail())) {
            throw new UserAlreadyExistsException("Email already in use");
        }

        userMapper.updateVendorFromDTO(profileUpdateDTO, vendor);
        Vendor updatedVendor = userRepository.save(vendor);
        return userMapper.vendorToVendorProfileDTO(updatedVendor);
    }
}
