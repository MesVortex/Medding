package org.filrouge.medding;

import org.filrouge.medding.dto.requests.ReviewRequestDTO;
import org.filrouge.medding.dto.responses.ReviewResponseDTO;
import org.filrouge.medding.entities.Organizer;
import org.filrouge.medding.entities.Review;
import org.filrouge.medding.entities.Vendor;
import org.filrouge.medding.exceptions.ResourceNotFoundException;
import org.filrouge.medding.exceptions.UnauthorizedException;
import org.filrouge.medding.mappers.ReviewMapper;
import org.filrouge.medding.repositories.ReviewRepository;
import org.filrouge.medding.repositories.UserRepository;
import org.filrouge.medding.services.implementations.ReviewServiceImpl;
import org.filrouge.medding.utils.SecurityUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReviewServiceImplTest {

    @Mock
    private ReviewRepository reviewRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ReviewMapper reviewMapper;

    @Mock
    private SecurityUtils securityUtils;

    @InjectMocks
    private ReviewServiceImpl reviewService;

    private Review testReview;
    private ReviewResponseDTO testReviewDTO;
    private ReviewRequestDTO testReviewRequest;
    private Organizer testOrganizer;
    private Vendor testVendor;

    @BeforeEach
    void setUp() {
        testOrganizer = new Organizer();
        testOrganizer.setId(1L);
        testOrganizer.setUsername("TestOrganizer");

        testVendor = new Vendor();
        testVendor.setId(2L);
        testVendor.setUsername("TestVendor");

        testReview = new Review();
        testReview.setId(1L);
        testReview.setRating(5.0);
        testReview.setComment("Great service!");
        testReview.setOrganizer(testOrganizer);
        testReview.setVendor(testVendor);

        testReviewDTO = new ReviewResponseDTO();
        testReviewDTO.setId(1L);
        testReviewDTO.setRating(5.0);
        testReviewDTO.setComment("Great service!");

        testReviewRequest = new ReviewRequestDTO();
        testReviewRequest.setVendorId(2L);
        testReviewRequest.setRating(5.0);
        testReviewRequest.setComment("Great service!");
    }

    @Test
    @DisplayName("Should create review successfully")
    void createReview_WithValidData_ShouldCreateReview() {
        when(securityUtils.getCurrentUserId()).thenReturn(1L);
        when(userRepository.findById(1L)).thenReturn(Optional.of(testOrganizer));
        when(userRepository.findById(2L)).thenReturn(Optional.of(testVendor));
        when(reviewRepository.findByVendorIdAndOrganizerId(2L, 1L)).thenReturn(Optional.empty());
        when(reviewRepository.save(any(Review.class))).thenReturn(testReview);
        when(reviewMapper.toDTO(any(Review.class))).thenReturn(testReviewDTO);

        ReviewResponseDTO result = reviewService.createReview(testReviewRequest);

        assertThat(result).isNotNull();
        assertThat(result.getRating()).isEqualTo(5.0);
        verify(reviewRepository).save(any(Review.class));
    }

    @Test
    @DisplayName("Should throw exception when creating duplicate review")
    void createReview_WithExistingReview_ShouldThrowException() {
        when(securityUtils.getCurrentUserId()).thenReturn(1L);
        when(userRepository.findById(1L)).thenReturn(Optional.of(testOrganizer));
        when(userRepository.findById(2L)).thenReturn(Optional.of(testVendor));
        when(reviewRepository.findByVendorIdAndOrganizerId(2L, 1L)).thenReturn(Optional.of(testReview));

        assertThrows(UnauthorizedException.class, () -> reviewService.createReview(testReviewRequest));
    }

    @Test
    @DisplayName("Should get vendor reviews successfully")
    void getVendorReviews_ShouldReturnListOfReviews() {
        when(reviewRepository.findByVendorId(2L)).thenReturn(Arrays.asList(testReview));
        when(reviewMapper.toDTO(any(Review.class))).thenReturn(testReviewDTO);

        List<ReviewResponseDTO> result = reviewService.getVendorReviews(2L);

        assertThat(result).isNotEmpty();
        assertThat(result.get(0).getRating()).isEqualTo(5);
        verify(reviewRepository).findByVendorId(2L);
    }

    @Test
    @DisplayName("Should update review successfully")
    void updateReview_WithValidData_ShouldUpdateReview() {
        when(securityUtils.getCurrentUserId()).thenReturn(1L);
        when(reviewRepository.findById(1L)).thenReturn(Optional.of(testReview));
        when(reviewRepository.save(any(Review.class))).thenReturn(testReview);
        when(reviewMapper.toDTO(any(Review.class))).thenReturn(testReviewDTO);

        ReviewResponseDTO result = reviewService.updateReview(1L, testReviewRequest);

        assertThat(result).isNotNull();
        verify(reviewRepository).save(any(Review.class));
    }

    @Test
    @DisplayName("Should throw exception when updating non-existent review")
    void updateReview_WithInvalidId_ShouldThrowException() {
        when(reviewRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class,
                () -> reviewService.updateReview(99L, testReviewRequest));
    }

    @Test
    @DisplayName("Should delete review successfully")
    void deleteReview_WithValidId_ShouldDeleteReview() {
        when(securityUtils.getCurrentUserId()).thenReturn(1L);
        when(reviewRepository.findById(1L)).thenReturn(Optional.of(testReview));

        reviewService.deleteReview(1L);

        verify(reviewRepository).deleteById(1L);
    }

    @Test
    @DisplayName("Should throw exception when deleting review from different user")
    void deleteReview_WithUnauthorizedUser_ShouldThrowException() {
        when(securityUtils.getCurrentUserId()).thenReturn(99L);
        when(reviewRepository.findById(1L)).thenReturn(Optional.of(testReview));

        assertThrows(UnauthorizedException.class, () -> reviewService.deleteReview(1L));
    }
}