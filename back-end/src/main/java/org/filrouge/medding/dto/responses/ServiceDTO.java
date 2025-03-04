package org.filrouge.medding.dto.responses;

import lombok.Data;
import org.filrouge.medding.entities.enums.WeddingServiceCategory;

@Data
public class ServiceDTO {
    private Long id;
    private String title;
    private String description;
    private Double price;
    private WeddingServiceCategory category;
}
