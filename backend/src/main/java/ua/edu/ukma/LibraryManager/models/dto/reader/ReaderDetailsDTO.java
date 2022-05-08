package ua.edu.ukma.LibraryManager.models.dto.reader;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ua.edu.ukma.LibraryManager.models.domain.Checkout;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ReaderDetailsDTO {

    private Integer ticketNumber;

    private String lastName;
    private String firstName;
    private String patronymic;
    private List<String> phoneNumbers;

    private LocalDate birthDate;
    private String homeCity;
    private String homeStreet;
    private String homeBuildingNumber;
    private Integer homeFlatNumber;

    private String workPlace;
}
