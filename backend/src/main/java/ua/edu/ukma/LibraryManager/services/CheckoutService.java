package ua.edu.ukma.LibraryManager.services;

import ua.edu.ukma.LibraryManager.models.dto.checkout.CheckoutDetailsDTO;

import java.util.List;

public interface CheckoutService {

    List<CheckoutDetailsDTO> getCheckoutOfUser(String readerEmail);
}
