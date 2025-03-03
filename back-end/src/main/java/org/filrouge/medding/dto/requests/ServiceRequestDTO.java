package org.filrouge.medding.dto.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServiceRequestDTO {
    private String title;
    private String description;
    private Double price;
    private Boolean availability;
    private Long weddingId;
}
