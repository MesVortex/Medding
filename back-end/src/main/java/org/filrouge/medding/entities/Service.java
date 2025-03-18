package org.filrouge.medding.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.filrouge.medding.entities.enums.WeddingServiceCategory;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "services")
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private Double price;
    private Boolean availability;
    private WeddingServiceCategory category;

    @ManyToOne
    @JoinColumn(name = "wedding_id")
    private Wedding wedding;

    @ManyToOne
    @JoinColumn(name = "vendor_id")
    private Vendor vendor;

    @OneToMany(mappedBy = "service", cascade = CascadeType.ALL)
    private List<ServiceBooking> bookings;
}