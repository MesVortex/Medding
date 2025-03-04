package org.filrouge.medding.controllers;

import lombok.RequiredArgsConstructor;
import org.filrouge.medding.dto.responses.VendorProfileDTO;
import org.filrouge.medding.dto.responses.UserResponseDTO;
import org.filrouge.medding.services.interfaces.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profiles")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping("/vendors/{id}")
    public ResponseEntity<VendorProfileDTO> getVendorProfile(@PathVariable Long id) {
        return ResponseEntity.ok(profileService.getVendorProfile(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserProfile(@PathVariable Long id) {
        return ResponseEntity.ok(profileService.getUserProfile(id));
    }
}
