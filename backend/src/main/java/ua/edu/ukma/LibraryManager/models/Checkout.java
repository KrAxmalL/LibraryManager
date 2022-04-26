package ua.edu.ukma.LibraryManager.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "checkout_history")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Checkout {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer actNumber;

    @Column(name = "replacement_date")
    private LocalDate startDate;

    @Column(name = "replacement_date")
    private LocalDate expectedFinishDate;

    @Column(name = "replacement_date")
    private LocalDate realFinishDate;

    @Column(name = "compensation")
    private BigDecimal compensation;

    @ManyToOne
    private BookExemplar exemplar;

    @ManyToOne
    private Reader reader;
}
