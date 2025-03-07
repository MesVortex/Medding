package org.filrouge.medding.dto.responses;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ReviewResponseDTO {
    private Long id;
    private Double rating;
    private String comment;
    private Long vendorId;
    private Long organizerId;
    private String organizerName;
    private LocalDateTime createdAt;
}
