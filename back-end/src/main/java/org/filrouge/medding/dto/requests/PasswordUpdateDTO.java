package org.filrouge.medding.dto.requests;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class PasswordUpdateDTO {
    @NotBlank(message = "Current password is required")
    private String currentPassword;

    @NotBlank(message = "New password is required")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String newPassword;
}
