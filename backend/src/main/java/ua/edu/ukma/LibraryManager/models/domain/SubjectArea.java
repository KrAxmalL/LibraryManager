package ua.edu.ukma.LibraryManager.models.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
            joinColumns = @JoinColumn(name = "subject_area_cipher"),
            inverseJoinColumns = @JoinColumn(name = "book_isbn")
    )
    private List<Book> books;
}
