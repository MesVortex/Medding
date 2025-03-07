package org.filrouge.medding.services.interfaces;

import org.filrouge.medding.dto.requests.ReviewRequestDTO;
import org.filrouge.medding.dto.responses.ReviewResponseDTO;
import java.util.List;

public interface ReviewService {
    ReviewResponseDTO createReview(ReviewRequestDTO reviewRequestDTO);
    List<ReviewResponseDTO> getVendorReviews(Long vendorId);
    void deleteReview(Long reviewId);
    ReviewResponseDTO updateReview(Long reviewId, ReviewRequestDTO reviewRequestDTO);
}
