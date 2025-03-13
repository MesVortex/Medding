package org.filrouge.medding.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.filrouge.medding.dto.requests.ProfileUpdateDTO;
import org.filrouge.medding.dto.responses.ErrorResponse;
import org.filrouge.medding.dto.responses.VendorProfileDTO;
import org.filrouge.medding.dto.responses.UserResponseDTO;
import org.filrouge.medding.entities.Organizer;
import org.filrouge.medding.entities.User;
import org.filrouge.medding.entities.Vendor;
import org.filrouge.medding.exceptions.UserAlreadyExistsException;
import org.filrouge.medding.exceptions.UserNotFoundException;
import org.filrouge.medding.mappers.UserMapper;
import org.filrouge.medding.repositories.UserRepository;
import org.filrouge.medding.services.interfaces.ProfileService;
import org.filrouge.medding.utils.SecurityUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profiles")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ProfileController {

    private final ProfileService profileService;
    private final SecurityUtils securityUtils;
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        try {
            Long userId = securityUtils.getCurrentUserId();
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new UserNotFoundException("User not found"));

            UserResponseDTO response;
            if (user instanceof Vendor) {
                response = userMapper.vendorToVendorResponseDTO((Vendor) user);
            } else if (user instanceof Organizer) {
                response = userMapper.organizerToOrganizerResponseDTO((Organizer) user);
            } else {
                response = userMapper.userToUserResponseDTO(user);
            }

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse("Authentication error", e.getMessage()));
        }
    }


    @GetMapping("/vendors/{id}")
    public ResponseEntity<VendorProfileDTO> getVendorProfile(@PathVariable Long id) {
        return ResponseEntity.ok(profileService.getVendorProfile(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserProfile(@PathVariable Long id) {
        return ResponseEntity.ok(profileService.getUserProfile(id));
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<UserResponseDTO> updateUserProfile(
            @PathVariable Long id,
            @Valid @RequestBody ProfileUpdateDTO profileUpdateDTO) throws UserAlreadyExistsException {
        return ResponseEntity.ok(profileService.updateUserProfile(id, profileUpdateDTO));
    }

    @PutMapping("/vendors/{id}")
    public ResponseEntity<VendorProfileDTO> updateVendorProfile(
            @PathVariable Long id,
            @Valid @RequestBody ProfileUpdateDTO profileUpdateDTO) throws UserAlreadyExistsException {
        return ResponseEntity.ok(profileService.updateVendorProfile(id, profileUpdateDTO));
    }
}
