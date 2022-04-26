package ua.edu.ukma.LibraryManager.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "book_exemplar")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookExemplar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer inventoryNumber;

    @Column(name = "shelf")
    private String shelf;
}
