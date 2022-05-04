package ua.edu.ukma.LibraryManager.models.dto.principal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AddReaderDTO {

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
