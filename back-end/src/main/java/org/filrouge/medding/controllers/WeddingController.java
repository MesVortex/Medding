package org.filrouge.medding.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.filrouge.medding.dto.requests.WeddingRequestDTO;
import org.filrouge.medding.dto.responses.WeddingResponseDTO;
import org.filrouge.medding.services.interfaces.WeddingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/weddings")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class WeddingController {

    private final WeddingService weddingService;

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ORGANIZER')")
    public ResponseEntity<WeddingResponseDTO> createWedding(@Valid @RequestBody WeddingRequestDTO weddingRequestDTO) {
        return new ResponseEntity<>(weddingService.createWedding(weddingRequestDTO), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<WeddingResponseDTO>> getAllWeddings() {
        return ResponseEntity.ok(weddingService.getAllWeddings());
    }

    @GetMapping("/{id}")
    public ResponseEntity<WeddingResponseDTO> getWeddingById(@PathVariable Long id) {
        return ResponseEntity.ok(weddingService.getWeddingById(id));
    }

    @GetMapping("/organizer/{organizerId}")
    public ResponseEntity<List<WeddingResponseDTO>> getWeddingsByOrganizerId(@PathVariable Long organizerId) {
        return ResponseEntity.ok(weddingService.getWeddingsByOrganizerId(organizerId));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ORGANIZER')")
    public ResponseEntity<WeddingResponseDTO> updateWedding(
            @PathVariable Long id,
            @Valid @RequestBody WeddingRequestDTO weddingRequestDTO) {
        return ResponseEntity.ok(weddingService.updateWedding(id, weddingRequestDTO));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ORGANIZER')")
    public ResponseEntity<Void> deleteWedding(@PathVariable Long id) {
        weddingService.deleteWedding(id);
        return ResponseEntity.noContent().build();
    }
}
