package org.filrouge.medding.services.implementations;

import lombok.RequiredArgsConstructor;
import org.filrouge.medding.dto.responses.VendorProfileDTO;
import org.filrouge.medding.dto.responses.UserResponseDTO;
import org.filrouge.medding.entities.User;
import org.filrouge.medding.entities.Vendor;
import org.filrouge.medding.exceptions.ResourceNotFoundException;
import org.filrouge.medding.mappers.UserMapper;
import org.filrouge.medding.repositories.UserRepository;
import org.filrouge.medding.services.interfaces.ProfileService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

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
}
