package ua.edu.ukma.LibraryManager.services;

import ua.edu.ukma.LibraryManager.models.dto.bookExemplar.BookExemplarDTO;
import ua.edu.ukma.LibraryManager.models.dto.replacementAct.AddReplacementActDTO;

import java.util.List;

public interface BookExemplarService {

    List<BookExemplarDTO> getAllExemplars();

    boolean addExemplarForBook(BookExemplarDTO exemplarToAdd);

    boolean exemplarIsAvailableForCheckout(Integer inventoryNumber);

    boolean changeShelfForExemplar(Integer inventoryNumber, String newShelf);

    boolean deleteExemplar(Integer inventoryNumber);

    boolean replaceExemplar(Integer inventoryNumber, AddReplacementActDTO replacementData);
}
