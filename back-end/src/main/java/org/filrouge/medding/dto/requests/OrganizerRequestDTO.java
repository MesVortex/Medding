package org.filrouge.medding.dto.requests;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class OrganizerRequestDTO extends UserRequestDTO {
    private String number;
}
