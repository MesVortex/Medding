package org.filrouge.medding.dto.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WeddingResponseDTO {
    private Long id;
    private Double budget;
    private Date date;
    private String location;
    private String organizerName;
}
