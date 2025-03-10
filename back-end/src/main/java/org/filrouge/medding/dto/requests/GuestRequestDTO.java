package org.filrouge.medding.dto.requests;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.filrouge.medding.entities.enums.StatusRSVP;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GuestRequestDTO {
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    @NotNull(message = "RSVP status is required")
    private StatusRSVP rsvpStatus;

    @NotNull(message = "Wedding ID is required")
    private Long weddingId;
}
