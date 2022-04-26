package ua.edu.ukma.LibraryManager.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "subject_area")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SubjectArea {

    @Id
    @Column(name = "cipher")
    private String cipher;

    @Column(name = "subject_area_name")
    private String subjectAreaName;

    @ManyToMany
    @JoinTable(name = "book_subject_area",
            joinColumns = @JoinColumn(name = "book_isbn"),
            inverseJoinColumns = @JoinColumn(name = "subject_area_cipher")
    )
    private List<Book> books;
}
