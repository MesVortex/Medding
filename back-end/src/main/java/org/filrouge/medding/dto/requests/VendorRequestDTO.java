package org.filrouge.medding.dto.requests;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class VendorRequestDTO extends UserRequestDTO {
    @NotBlank(message = "Location is required")
    @Size(min = 2, max = 200, message = "Location must be between 2 and 200 characters")
    private String location;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^\\+?[0-9]{8,15}$", message = "Invalid phone number format")
    private String number;
}
