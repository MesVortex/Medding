package org.filrouge.medding.controllers;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.filrouge.medding.dto.requests.GuestRequestDTO;
import org.filrouge.medding.dto.responses.GuestResponseDTO;
import org.filrouge.medding.entities.enums.StatusRSVP;
import org.filrouge.medding.services.interfaces.GuestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/guests")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class GuestController {
    private final GuestService guestService;

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ORGANIZER')")
    public ResponseEntity<GuestResponseDTO> createGuest(@Valid @RequestBody GuestRequestDTO guestRequestDTO) {
        return new ResponseEntity<>(guestService.createGuest(guestRequestDTO), HttpStatus.CREATED);
    }

    @GetMapping("/wedding/{weddingId}")
    @PreAuthorize("hasAuthority('ROLE_ORGANIZER')")
    public ResponseEntity<List<GuestResponseDTO>> getAllGuestsByWeddingId(@PathVariable Long weddingId) {
        return ResponseEntity.ok(guestService.getAllGuestsByWeddingId(weddingId));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ORGANIZER')")
    public ResponseEntity<GuestResponseDTO> getGuestById(@PathVariable Long id) {
        return ResponseEntity.ok(guestService.getGuestById(id));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ORGANIZER')")
    public ResponseEntity<GuestResponseDTO> updateGuest(
            @PathVariable Long id,
            @Valid @RequestBody GuestRequestDTO guestRequestDTO) {
        return ResponseEntity.ok(guestService.updateGuest(id, guestRequestDTO));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ORGANIZER')")
    public ResponseEntity<Void> deleteGuest(@PathVariable Long id) {
        guestService.deleteGuest(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/send-invitation")
    @PreAuthorize("hasAuthority('ROLE_ORGANIZER')")
    public ResponseEntity<GuestResponseDTO> sendInvitation(@PathVariable Long id) {
        return ResponseEntity.ok(guestService.sendInvitation(id));
    }

    @GetMapping("/rsvp/{token}")
    public ResponseEntity<GuestResponseDTO> handleRsvp(
            @PathVariable String token,
            @RequestParam StatusRSVP response) {
        return ResponseEntity.ok(guestService.updateRsvpStatus(token, response));
    }
}
