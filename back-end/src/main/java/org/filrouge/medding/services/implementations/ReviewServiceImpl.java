package org.filrouge.medding.services.implementations;

import lombok.RequiredArgsConstructor;
import org.filrouge.medding.dto.requests.ReviewRequestDTO;
import org.filrouge.medding.dto.responses.ReviewResponseDTO;
import org.filrouge.medding.entities.Review;
import org.filrouge.medding.entities.Organizer;
import org.filrouge.medding.entities.Vendor;
import org.filrouge.medding.exceptions.ResourceNotFoundException;
import org.filrouge.medding.exceptions.UnauthorizedException;
import org.filrouge.medding.mappers.ReviewMapper;
import org.filrouge.medding.repositories.ReviewRepository;
import org.filrouge.medding.repositories.UserRepository;
import org.filrouge.medding.services.interfaces.ReviewService;
import org.filrouge.medding.utils.SecurityUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ReviewMapper reviewMapper;
    private final SecurityUtils securityUtils;

    @Override
    public ReviewResponseDTO createReview(ReviewRequestDTO reviewRequestDTO) {
        Long currentUserId = securityUtils.getCurrentUserId();

        Organizer organizer = userRepository.findById(currentUserId)
                .filter(user -> user instanceof Organizer)
                .map(user -> (Organizer) user)
                .orElseThrow(() -> new UnauthorizedException("Only organizers can create reviews"));

        Vendor vendor = userRepository.findById(reviewRequestDTO.getVendorId())
                .filter(user -> user instanceof Vendor)
                .map(user -> (Vendor) user)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor not found"));

        // Check if organizer has already reviewed this vendor
        if (reviewRepository.findByVendorIdAndOrganizerId(vendor.getId(), organizer.getId()).isPresent()) {
            throw new UnauthorizedException("You have already reviewed this vendor");
        }

        Review review = new Review();
        review.setRating(reviewRequestDTO.getRating());
        review.setComment(reviewRequestDTO.getComment());
        review.setVendor(vendor);
        review.setOrganizer(organizer);

        return reviewMapper.toDTO(reviewRepository.save(review));
    }

    @Override
    public List<ReviewResponseDTO> getVendorReviews(Long vendorId) {
        return reviewRepository.findByVendorId(vendorId).stream()
                .map(reviewMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ReviewResponseDTO updateReview(Long reviewId, ReviewRequestDTO reviewRequestDTO) {
        Long currentUserId = securityUtils.getCurrentUserId();

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found"));

        if (!review.getOrganizer().getId().equals(currentUserId)) {
            throw new UnauthorizedException("You can only update your own reviews");
        }

        review.setRating(reviewRequestDTO.getRating());
        review.setComment(reviewRequestDTO.getComment());

        return reviewMapper.toDTO(reviewRepository.save(review));
    }

    @Override
    public void deleteReview(Long reviewId) {
        Long currentUserId = securityUtils.getCurrentUserId();

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found"));

        if (!review.getOrganizer().getId().equals(currentUserId)) {
            throw new UnauthorizedException("You can only delete your own reviews");
        }

        reviewRepository.deleteById(reviewId);
    }
}
