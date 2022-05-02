package ua.edu.ukma.LibraryManager.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.edu.ukma.LibraryManager.models.dto.book.AddBookDTO;
import ua.edu.ukma.LibraryManager.models.dto.bookExemplar.AddBookExemplarDTO;
import ua.edu.ukma.LibraryManager.repositories.BookExemplarRepository;

import static ua.edu.ukma.LibraryManager.utils.StringUtils.isNotNullOrBlank;

@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class BookExemplarServiceImpl implements BookExemplarService {

    private final BookExemplarRepository bookExemplarRepository;
    private final BookService bookService;

    @Override
    public boolean addExemplarForBook(AddBookExemplarDTO exemplarToAdd) {
        if(isValidBookExemplar(exemplarToAdd)) {
            String bookIsbn = exemplarToAdd.getBookIsbn().trim();
            if(!bookService.bookExists(bookIsbn)) {
                return false;
            }

            Integer inventoryNumber = exemplarToAdd.getInventoryNumber();
            if(bookExemplarRepository.existsById(inventoryNumber)) {
                return false;
            }

            String shelf = exemplarToAdd.getShelf().trim();
            bookExemplarRepository.addNewBookExemplar(bookIsbn, inventoryNumber, shelf);
            return true;
        }
        else {
            return false;
        }
    }

    public boolean isValidBookExemplar(AddBookExemplarDTO exemplarToAdd) {
        return exemplarToAdd.getInventoryNumber() != null
                && exemplarToAdd.getInventoryNumber() > 0
                && isNotNullOrBlank(exemplarToAdd.getShelf())
                && isNotNullOrBlank(exemplarToAdd.getBookIsbn());
    }
}
