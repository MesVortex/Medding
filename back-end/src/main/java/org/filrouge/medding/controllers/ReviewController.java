package org.filrouge.medding.controllers;

import lombok.RequiredArgsConstructor;
import org.filrouge.medding.dto.requests.ReviewRequestDTO;
import org.filrouge.medding.dto.responses.ReviewResponseDTO;
import org.filrouge.medding.services.interfaces.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class ReviewController {
    private final ReviewService reviewService;

    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ORGANIZER')")
    public ResponseEntity<ReviewResponseDTO> createReview(@Valid @RequestBody ReviewRequestDTO reviewRequestDTO) {
        return ResponseEntity.ok(reviewService.createReview(reviewRequestDTO));
    }

    @GetMapping("/vendor/{vendorId}")
    public ResponseEntity<List<ReviewResponseDTO>> getVendorReviews(@PathVariable Long vendorId) {
        return ResponseEntity.ok(reviewService.getVendorReviews(vendorId));
    }

    @PutMapping("/{reviewId}")
    @PreAuthorize("hasAuthority('ROLE_ORGANIZER')")
    public ResponseEntity<ReviewResponseDTO> updateReview(
            @PathVariable Long reviewId,
            @Valid @RequestBody ReviewRequestDTO reviewRequestDTO) {
        return ResponseEntity.ok(reviewService.updateReview(reviewId, reviewRequestDTO));
    }

    @DeleteMapping("/{reviewId}")
    @PreAuthorize("hasAuthority('ROLE_ORGANIZER')")
    public ResponseEntity<Void> deleteReview(@PathVariable Long reviewId) {
        reviewService.deleteReview(reviewId);
        return ResponseEntity.noContent().build();
    }
}