package org.filrouge.medding.dto.requests;

import lombok.Data;
import org.filrouge.medding.entities.enums.WeddingServiceCategory;

@Data
public class ServiceRequestDTO {
    private String title;
    private String description;
    private Double price;
    private Boolean availability;
    private WeddingServiceCategory category;
}
