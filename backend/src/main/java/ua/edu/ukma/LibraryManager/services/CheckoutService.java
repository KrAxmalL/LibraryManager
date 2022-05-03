package ua.edu.ukma.LibraryManager.services;

import ua.edu.ukma.LibraryManager.models.dto.checkout.AddCheckoutDTO;
import ua.edu.ukma.LibraryManager.models.dto.checkout.CheckoutDetailsDTO;
import ua.edu.ukma.LibraryManager.models.dto.checkout.FinishCheckoutDTO;

import java.util.List;

public interface CheckoutService {

    List<CheckoutDetailsDTO> getCheckoutOfUser(String readerEmail);

    boolean addNewCheckout(AddCheckoutDTO checkoutToAdd);

    boolean finishCheckout(Integer checkoutNumber, FinishCheckoutDTO checkoutToFinish);
}
