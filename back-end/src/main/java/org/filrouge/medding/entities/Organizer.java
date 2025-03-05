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
@DiscriminatorValue("ORGANIZER")
public class Organizer extends User {
    private String number;

    @OneToMany(mappedBy = "organizer", cascade = CascadeType.ALL)
    private List<Wedding> weddings;
}
