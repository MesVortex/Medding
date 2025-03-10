package org.filrouge.medding.dto.requests;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class LoginRequestDTO {
    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
}