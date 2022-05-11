package ua.edu.ukma.LibraryManager.services;

import ua.edu.ukma.LibraryManager.models.dto.checkout.*;

import java.util.List;

public interface CheckoutService {

    List<LibrarianCheckoutDetailsDTO> getAllCheckouts();

    List<CheckoutDetailsDTO> getCheckoutOfUser(String readerEmail);

    boolean addNewCheckout(AddCheckoutDTO checkoutToAdd);

    boolean finishCheckout(Integer checkoutNumber, FinishCheckoutDTO checkoutToFinish);

    boolean continueCheckout(Integer checkoutNumber, ContinueCheckoutDTO checkoutToContinue);

    boolean deleteCheckoutHistoryForBook(String bookIsbn);
}
