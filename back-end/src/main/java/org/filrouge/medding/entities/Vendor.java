package org.filrouge.medding.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

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

    @OneToMany(mappedBy = "vendor", cascade = CascadeType.ALL)
    private List<Service> services;
}
