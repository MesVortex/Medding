package org.filrouge.medding.dto.responses;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class VendorResponseDTO extends UserResponseDTO {
    private String location;
    private Integer number;
}
