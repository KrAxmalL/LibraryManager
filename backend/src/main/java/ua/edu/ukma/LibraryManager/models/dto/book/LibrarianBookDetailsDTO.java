package ua.edu.ukma.LibraryManager.models.dto.book;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class LibrarianBookDetailsDTO {

    private String isbn;
    private String title;
    private List<String> authors;
    private List<String> areas;
    private String publishingCity;
    private String publisher;
    private Integer publishingYear;
    private Integer pageNumber;
    private List<Integer> exemplars;
    private BigDecimal price;
}
