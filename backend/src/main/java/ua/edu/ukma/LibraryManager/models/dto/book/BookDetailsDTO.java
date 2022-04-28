package ua.edu.ukma.LibraryManager.models.dto.book;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ua.edu.ukma.LibraryManager.models.domain.BookExemplar;

import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookDetailsDTO {

    private String isbn;
    private String title;
    private List<String> authors;
    private List<String> areas;
    private List<String> availableExemplars;
    private LocalDate closestAvailableExemplar;
    private String publishingCity;
    private String publisher;
    private Integer publishingYear;
    private Integer pageNumber;
}
