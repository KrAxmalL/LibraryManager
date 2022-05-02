package ua.edu.ukma.LibraryManager.models.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "book_exemplar")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookExemplar {

    @Id
    @Column(name = "inventory_number")
    private Integer inventoryNumber;

    @Column(name = "shelf")
    private String shelf;

    @OneToMany(mappedBy = "exemplar")
    private List<Checkout> checkouts;

    @ManyToOne
    @JoinColumn(name = "book_isbn")
    private Book parentBook;
}
