package ua.edu.ukma.LibraryManager.services;

import ua.edu.ukma.LibraryManager.models.dto.bookExemplar.AddBookExemplarDTO;

public interface BookExemplarService {

    boolean addExemplarForBook(AddBookExemplarDTO exemplarToAdd);
}
