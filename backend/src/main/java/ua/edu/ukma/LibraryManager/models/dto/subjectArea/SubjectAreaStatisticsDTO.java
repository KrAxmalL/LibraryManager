package ua.edu.ukma.LibraryManager.models.dto.subjectArea;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SubjectAreaStatisticsDTO {

    private String cipher;
    private String subjectAreaName;

    private Integer takenBooks;
}
