package org.filrouge.medding.dto.responses;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class OrganizerResponseDTO extends UserResponseDTO {
    private Integer number;
}
