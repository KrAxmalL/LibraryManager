package ua.edu.ukma.LibraryManager.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "checkout_number")
    private Integer actNumber;

    @Column(name = "checkout_start_date")
    private LocalDate startDate;

    @Column(name = "checkout_expected_finish_date")
    private LocalDate expectedFinishDate;

    @Column(name = "checkout_real_finish_date")
    private LocalDate realFinishDate;

    @Column(name = "compensation")
    private BigDecimal compensation;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "exemplar_inventory_number")
    private BookExemplar exemplar;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "reader_ticket_number")
    private Reader reader;
}
