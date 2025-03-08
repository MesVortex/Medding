package org.filrouge.medding.entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("VENDOR")
public class Vendor extends User {
    private String location;
    private String number;
    private boolean verified;
    private LocalDateTime verifiedAt;

    @OneToMany(mappedBy = "vendor", cascade = CascadeType.ALL)
    private List<Service> services;
}
