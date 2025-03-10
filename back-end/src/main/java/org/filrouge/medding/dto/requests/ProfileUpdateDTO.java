package org.filrouge.medding.dto.requests;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ProfileUpdateDTO {
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    private String username;

    @Email(message = "Email should be valid")
    private String email;

    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;

    @Size(min = 2, max = 200, message = "Location must be between 2 and 200 characters")
    private String location;

    @Pattern(regexp = "^\\+?[0-9]{8,15}$", message = "Invalid phone number format")
    private String number;
}
