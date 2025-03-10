package org.filrouge.medding.dto.requests;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ReviewRequestDTO {
    @NotNull(message = "Vendor ID is required")
    private Long vendorId;

    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be between 1 and 5")
    @Max(value = 5, message = "Rating must be between 1 and 5")
    private Double rating;

    @Size(max = 1000, message = "Comment must not exceed 1000 characters")
    private String comment;
}