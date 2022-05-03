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
public class AddCheckoutDTO {

    private Integer readerTicketNumber;
    private Integer exemplarInventoryNumber;

    private LocalDate startDate;
    private LocalDate expectedFinishDate;

    @Override
    public String toString() {
        return "AddCheckoutDTO{" +
                "readerTicketNumber=" + readerTicketNumber +
                ", exemplarInventoryNumber=" + exemplarInventoryNumber +
                ", startDate=" + startDate +
                ", expectedFinishDate=" + expectedFinishDate +
                '}';
    }
}
