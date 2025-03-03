package org.filrouge.medding.dto.requests;

import jakarta.validation.constraints.*;
import lombok.*;
import org.filrouge.medding.entities.enums.UserRole;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDTO {
    @NotBlank(message = "Username is mandatory")
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    private String username;

    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Password is mandatory")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;

    @NotNull
    private UserRole role = UserRole.ORGANIZER;
}

