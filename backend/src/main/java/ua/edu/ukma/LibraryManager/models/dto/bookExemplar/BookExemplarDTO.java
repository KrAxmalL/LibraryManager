package ua.edu.ukma.LibraryManager.models.dto.bookExemplar;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookExemplarDTO {

    private String bookIsbn;
    private Integer inventoryNumber;
    private String shelf;
}
