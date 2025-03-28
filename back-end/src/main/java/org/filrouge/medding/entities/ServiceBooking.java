package org.filrouge.medding.entities;

import jakarta.persistence.*;
import lombok.Data;
import org.filrouge.medding.entities.enums.ServiceBookingStatus;

import java.time.LocalDateTime;

@Entity
@Data
public class ServiceBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    private Service service;

    @ManyToOne(cascade = CascadeType.ALL)
    private Wedding wedding;

    private LocalDateTime bookedAt;

    @Enumerated(EnumType.STRING)
    private ServiceBookingStatus status;
}
