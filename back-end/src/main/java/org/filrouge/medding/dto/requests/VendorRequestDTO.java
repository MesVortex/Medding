package org.filrouge.medding.dto.requests;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class VendorRequestDTO extends UserRequestDTO {
    private String location;
    private String number;
}
