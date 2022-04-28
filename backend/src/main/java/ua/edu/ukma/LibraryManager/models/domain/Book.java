package ua.edu.ukma.LibraryManager.models.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "book")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Book {

    @Id
    @Column(name = "isbn")
    private String isbn;

    @Column(name = "title")
    private String title;

    @ElementCollection
    @CollectionTable(name = "book_author", joinColumns = @JoinColumn(name = "book_isbn"))
    @Column(name = "author_name")
    private List<String> authors;

    @OneToMany(mappedBy = "parentBook")
    private List<BookExemplar> exemplars;

    @ManyToMany(mappedBy = "books")
    private List<SubjectArea> areas;

    @Column(name = "publishing_city")
    private String publishingCity;

    @Column(name = "publisher")
    private String publisher;

    @Column(name = "publishing_year")
    private Integer publishingYear;

    @Column(name = "page_number")
    private Integer pageNumber;

    @Column(name = "price")
    private BigDecimal price;
}
