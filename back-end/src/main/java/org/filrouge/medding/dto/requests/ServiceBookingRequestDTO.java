package org.filrouge.medding.dto.requests;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ServiceBookingRequestDTO {
    @NotNull(message = "Wedding ID is required")
    private Long weddingId;
}
