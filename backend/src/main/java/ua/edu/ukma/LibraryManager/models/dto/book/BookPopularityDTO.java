package ua.edu.ukma.LibraryManager.models.dto.book;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookPopularityDTO {

    private String isbn;
    private String title;
    private List<String> authors;
    private List<String> areas;

    private Integer popularity;
}
