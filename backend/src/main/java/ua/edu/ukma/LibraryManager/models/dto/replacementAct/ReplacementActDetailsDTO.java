package ua.edu.ukma.LibraryManager.models.dto.replacementAct;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ReplacementActDetailsDTO {

    private String bookIsbn;
    private String bookTitle;

    private Integer replacementActNumber;
    private Integer replacedExemplarInventoryNumber;
    private Integer replaceExemplarInventoryNumber;
    private LocalDate replacementDate;

    private BigDecimal compensation;
}
