package ua.edu.ukma.LibraryManager.services;

import ua.edu.ukma.LibraryManager.models.dto.bookExemplar.AddBookExemplarDTO;

public interface BookExemplarService {

    boolean addExemplarForBook(AddBookExemplarDTO exemplarToAdd);

    boolean exemplarIsAvailableForCheckout(Integer inventoryNumber);

    boolean changeShelfForExemplar(Integer inventoryNumber, String newShelf);

    boolean deleteExemplar(Integer inventoryNumber);
}
