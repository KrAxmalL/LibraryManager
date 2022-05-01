package ua.edu.ukma.LibraryManager.models.dto.checkout;

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
public class CheckoutDetailsDTO {

    private Integer checkoutNumber;
    private LocalDate checkoutStartDate;
    private LocalDate checkoutExpectedFinishDate;
    private LocalDate checkoutRealFinishDate;

    private String bookIsbn;
    private String bookTitle;

    private Integer exemplarInventoryNumber;
}
