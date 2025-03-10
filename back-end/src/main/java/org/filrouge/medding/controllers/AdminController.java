package org.filrouge.medding.controllers;

import lombok.RequiredArgsConstructor;
import org.filrouge.medding.dto.responses.DashboardStatsDTO;
import org.filrouge.medding.dto.responses.UserResponseDTO;
import org.filrouge.medding.dto.responses.VendorProfileDTO;
import org.filrouge.medding.services.interfaces.UserService;
import org.filrouge.medding.services.interfaces.VendorService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {

    private final VendorService vendorService;
    private final UserService userService;

    @PutMapping("/vendors/{id}/verify")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<VendorProfileDTO> verifyVendor(@PathVariable Long id) {
        return ResponseEntity.ok(vendorService.verifyVendor(id));
    }

    @PutMapping("/vendors/{id}/unverify")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<VendorProfileDTO> unverifyVendor(@PathVariable Long id) {
        return ResponseEntity.ok(vendorService.unverifyVendor(id));
    }

    @GetMapping("/vendors/pending")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<VendorProfileDTO>> getPendingVendors() {
        return ResponseEntity.ok(vendorService.getPendingVendors());
    }

    @DeleteMapping("/vendors/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<Void> deleteVendor(@PathVariable Long id) {
        vendorService.deleteVendor(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/users")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/dashboard/stats")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<DashboardStatsDTO> getDashboardStats() {
        return ResponseEntity.ok(userService.getDashboardStats());
    }
}
