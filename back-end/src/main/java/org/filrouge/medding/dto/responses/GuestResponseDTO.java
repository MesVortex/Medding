package org.filrouge.medding.dto.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.filrouge.medding.entities.enums.StatusRSVP;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GuestResponseDTO {
    private Long id;
    private String name;
    private String email;
    private StatusRSVP rsvpStatus;
    private Long weddingId;
    private boolean invitationSent;
    private LocalDateTime invitationSentDate;
}
