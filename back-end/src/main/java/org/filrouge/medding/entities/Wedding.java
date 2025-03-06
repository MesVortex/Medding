package org.filrouge.medding.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "weddings")
public class Wedding {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String bride;
    private String groom;
    private Double budget;
    private Date date;
    private String location;

    @ManyToOne
    private Organizer organizer;

    @OneToMany(mappedBy = "wedding", cascade = CascadeType.ALL)
    private List<Service> services;

    @OneToMany(mappedBy = "wedding", cascade = CascadeType.ALL)
    private List<Guest> guests;
}
