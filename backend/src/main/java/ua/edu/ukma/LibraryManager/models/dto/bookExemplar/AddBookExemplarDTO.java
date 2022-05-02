package ua.edu.ukma.LibraryManager.models.dto.bookExemplar;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Id;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AddBookExemplarDTO {

    private String bookIsbn;
    private Integer inventoryNumber;
    private String shelf;
}
