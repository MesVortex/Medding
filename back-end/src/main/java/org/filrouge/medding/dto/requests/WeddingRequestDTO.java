package org.filrouge.medding.dto.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WeddingRequestDTO {
    private String bride;
    private String groom;
    private Double budget;
    private Date date;
    private String location;
}
