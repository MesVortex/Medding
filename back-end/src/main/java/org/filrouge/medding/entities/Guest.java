package org.filrouge.medding.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.filrouge.medding.entities.enums.StatusRSVP;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "guests")
public class Guest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    @Enumerated(EnumType.STRING)
    private StatusRSVP rsvpStatus;

    @Column(name = "invitationSent", columnDefinition = "boolean default false")
    private boolean invitationSent;
    private LocalDateTime invitationSentDate;

    private String invitationToken;

    @ManyToOne
    private Wedding wedding;
}
