package ua.edu.ukma.LibraryManager.models.dto.reader;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class OwerReaderDTO {

    private Integer ticketNumber;

    private String lastName;
    private String firstName;
    private String patronymic;
    private List<String> phoneNumbers;

    private Integer debtBooks;
}
