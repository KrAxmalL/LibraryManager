package ua.edu.ukma.LibraryManager.models.dto.replacementAct;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ua.edu.ukma.LibraryManager.models.domain.BookExemplar;

import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AddReplacementActDTO {

    private LocalDate replacementDate;
    private Integer newExemplarInventoryNumber;
}
