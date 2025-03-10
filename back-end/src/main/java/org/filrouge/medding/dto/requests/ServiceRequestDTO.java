package org.filrouge.medding.dto.requests;

import jakarta.validation.constraints.*;
import lombok.Data;
import org.filrouge.medding.entities.enums.WeddingServiceCategory;

@Data
public class ServiceRequestDTO {
    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 100, message = "Title must be between 3 and 100 characters")
    private String title;

    @NotBlank(message = "Description is required")
    @Size(min = 10, max = 1000, message = "Description must be between 10 and 1000 characters")
    private String description;

    @NotNull(message = "Price is required")
    @Min(value = 0, message = "Price must be positive")
    private Double price;

    @NotNull(message = "Availability is required")
    private Boolean availability;

    @NotNull(message = "Category is required")
    private WeddingServiceCategory category;
}