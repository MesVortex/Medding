package org.filrouge.medding.dto.requests;

import lombok.Data;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@Data
public class ReviewRequestDTO {
    @NotNull
    private Long vendorId;

    @NotNull
    @Min(1)
    @Max(5)
    private Double rating;

    private String comment;
}
