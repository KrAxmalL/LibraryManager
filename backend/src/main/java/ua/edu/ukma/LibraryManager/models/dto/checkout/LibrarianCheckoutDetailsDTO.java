package ua.edu.ukma.LibraryManager.models.dto.checkout;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class LibrarianCheckoutDetailsDTO {

    private Integer readerTicketNumber;
    private String initials;

    private String bookIsbn;
    private String bookTitle;

    private Integer exemplarInventoryNumber;

    private Integer checkoutNumber;
    private LocalDate checkoutStartDate;
    private LocalDate checkoutExpectedFinishDate;
    private LocalDate checkoutRealFinishDate;
}
