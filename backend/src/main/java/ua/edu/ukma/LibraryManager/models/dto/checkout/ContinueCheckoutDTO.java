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
public class ContinueCheckoutDTO {

    LocalDate newExpectedFinishDate;
}
