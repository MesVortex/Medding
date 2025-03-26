package org.filrouge.medding.controllers;

import lombok.RequiredArgsConstructor;
import org.filrouge.medding.dto.responses.VendorProfileDTO;
import org.filrouge.medding.services.interfaces.VendorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vendors")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class VendorController {

    private final VendorService vendorService;

    @GetMapping
    public ResponseEntity<List<VendorProfileDTO>> getAllVendors() {
        return ResponseEntity.ok(vendorService.getAllVendors());
    }
}
