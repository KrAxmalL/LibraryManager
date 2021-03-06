package ua.edu.ukma.LibraryManager.models.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "replacement_act")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ReplacementAct {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer actNumber;

    @Column(name = "replacement_date")
    private LocalDate replacementDate;

    @OneToOne
    @JoinColumn(name = "replaced_exemplar_number", referencedColumnName = "inventory_number")
    private BookExemplar replacedExemplar;

    @OneToOne
    @JoinColumn(name = "new_exemplar_number", referencedColumnName = "inventory_number")
    private BookExemplar newExemplar;
}
