package ua.edu.ukma.LibraryManager.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.edu.ukma.LibraryManager.models.domain.BookExemplar;
import ua.edu.ukma.LibraryManager.models.dto.book.AddBookDTO;
import ua.edu.ukma.LibraryManager.models.dto.bookExemplar.BookExemplarDTO;
import ua.edu.ukma.LibraryManager.models.dto.replacementAct.AddReplacementActDTO;
import ua.edu.ukma.LibraryManager.repositories.BookExemplarRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static ua.edu.ukma.LibraryManager.utils.StringUtils.isNotNullOrBlank;

@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class BookExemplarServiceImpl implements BookExemplarService {

    private final BookExemplarRepository bookExemplarRepository;
    private final ReplacementActService replacementActService;

    @Override
    public List<BookExemplarDTO> getAllExemplars() {
        List<BookExemplar> exemplars = bookExemplarRepository.findAll();
        return exemplars.stream().map(exemplar -> {
            BookExemplarDTO resDTO = new BookExemplarDTO();
            resDTO.setInventoryNumber(exemplar.getInventoryNumber());
            resDTO.setShelf(exemplar.getShelf());
            resDTO.setBookIsbn(exemplar.getParentBook().getIsbn());
            return resDTO;
        }).collect(Collectors.toList());
    }

    @Override
    public boolean addExemplarForBook(BookExemplarDTO exemplarToAdd) {
        if(isValidBookExemplar(exemplarToAdd)) {
            try {
                String bookIsbn = exemplarToAdd.getBookIsbn().trim();
                Integer inventoryNumber = exemplarToAdd.getInventoryNumber();
                String shelf = exemplarToAdd.getShelf().trim();
                bookExemplarRepository.addNewBookExemplar(bookIsbn, inventoryNumber, shelf);
                return true;
            } catch(Exception ex) {
                ex.printStackTrace();
                return false;
            }
        }
        else {
            return false;
        }
    }

    @Override
    public boolean exemplarIsAvailableForCheckout(Integer inventoryNumber) {
        return bookExemplarRepository.findExemplarAvailableForCheckout(inventoryNumber).isPresent();
    }

    @Override
    public boolean changeShelfForExemplar(Integer inventoryNumber, String newShelf) {
        bookExemplarRepository.changeShelfForBookExemplar(inventoryNumber, newShelf);
        Optional<BookExemplar> exemplarOpt = bookExemplarRepository.findById(inventoryNumber);
        return exemplarOpt.map(bookExemplar -> bookExemplar.getShelf().equalsIgnoreCase(newShelf)).orElse(false);
    }

    @Override
    public boolean deleteExemplar(Integer inventoryNumber) {
        if(bookExemplarRepository.existsById(inventoryNumber)) {
            List<Integer> activeCheckout = bookExemplarRepository.findActiveCheckoutsOfExemplar(inventoryNumber);
            if(activeCheckout.isEmpty()) {
                bookExemplarRepository.deleteBookExemplar(inventoryNumber);
                return !bookExemplarRepository.existsById(inventoryNumber);
            }
        }

        return false;
    }

    @Override
    public boolean replaceExemplar(Integer inventoryNumber, AddReplacementActDTO replacementData) {
        if(bookExemplarRepository.existsById(inventoryNumber)
                && bookExemplarRepository.existsById(replacementData.getNewExemplarInventoryNumber())) {
            return replacementActService.addReplacementAct(inventoryNumber, replacementData);
        }

        return false;
    }

    public boolean isValidBookExemplar(BookExemplarDTO exemplarToAdd) {
        return exemplarToAdd.getInventoryNumber() != null
                && exemplarToAdd.getInventoryNumber() > 0
                && isNotNullOrBlank(exemplarToAdd.getShelf())
                && isNotNullOrBlank(exemplarToAdd.getBookIsbn());
    }
}
