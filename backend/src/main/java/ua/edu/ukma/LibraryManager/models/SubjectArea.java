package ua.edu.ukma.LibraryManager.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

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
}
