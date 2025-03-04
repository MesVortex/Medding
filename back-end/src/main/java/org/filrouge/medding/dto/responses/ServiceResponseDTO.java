package org.filrouge.medding.dto.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServiceResponseDTO {
    private Long id;
    private String title;
    private String description;
    private Double price;
    private Boolean availability;
    private String category;
    private Long vendorId;
}
