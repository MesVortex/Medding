package org.filrouge.medding.dto.requests;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WeddingRequestDTO {
    @NotBlank(message = "Bride name is required")
    @Size(min = 2, max = 100, message = "Bride name must be between 2 and 100 characters")
    private String bride;

    @NotBlank(message = "Groom name is required")
    @Size(min = 2, max = 100, message = "Groom name must be between 2 and 100 characters")
    private String groom;

    @NotNull(message = "Budget is required")
    @Min(value = 0, message = "Budget must be positive")
    private Double budget;

    @NotNull(message = "Date is required")
    @Future(message = "Wedding date must be in the future")
    private Date date;

    @NotBlank(message = "Location is required")
    @Size(min = 2, max = 200, message = "Location must be between 2 and 200 characters")
    private String location;
}
