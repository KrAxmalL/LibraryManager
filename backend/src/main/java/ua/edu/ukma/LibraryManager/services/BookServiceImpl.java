package ua.edu.ukma.LibraryManager.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.edu.ukma.LibraryManager.models.domain.Book;
import ua.edu.ukma.LibraryManager.models.domain.BookExemplar;
import ua.edu.ukma.LibraryManager.models.dto.book.AddBookDTO;
import ua.edu.ukma.LibraryManager.repositories.BookRepository;
import ua.edu.ukma.LibraryManager.repositories.SubjectAreaRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static ua.edu.ukma.LibraryManager.utils.StringUtils.isNotNullOrBlank;

@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    private static final String ISBN_REGEXP = "^\\d{3}-\\d-\\d{5}-\\d{3}-\\d$";

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Optional<Book> getBookByIsbn(String isbn) {
        return bookRepository.findById(isbn);
    }

    @Override
    public List<Book> getBooksOfSubjectArea(String areaCipher) {
        return bookRepository.findBooksBySubjectArea(areaCipher);
    }

    @Override
    public List<Book> getBooksOfAuthor(String authorName) {
        return bookRepository.findBooksByAuthor(authorName);
    }

    @Override
    public List<Book> getBooksByTitle(String title) {
        return bookRepository.findBooksByTitle(title);
    }

    @Override
    public List<Book> getBooksOfAuthorAndTitle(String title, List<String> authors) {
        return bookRepository.findBooksByAuthorsAndTitle(title, authors);
    }

    @Override
    public List<Book> getBooksOfAreaAndTitle(String title, List<String> areasIds) {
        return bookRepository.findBooksByAreasAndTitle(title, areasIds);
    }

    @Override
    public List<Book> getBooksOfAuthorAndAreaAndTitle(String title, List<String> authors, List<String> areasIds) {
        return bookRepository.findBooksByAreasAndAuthorsAndTitle(title, areasIds, authors);
    }

    @Override
    public List<String> getAllAuthors() {
        return bookRepository.findAllAuthors();
    }

    @Override
    public List<BookExemplar> getBookExemplars(String bookIsbn) {
        return bookRepository.findBookExemplars(bookIsbn);
    }

    @Override
    public List<BookExemplar> getAvailableExemplars(String bookIsbn) {
        List<Object[]> exemplarsAsObjects = bookRepository.findAvailableBookExemplars(bookIsbn);
        return exemplarsAsObjects.stream().map((exemplar) -> {
            BookExemplar resultExemplar = new BookExemplar();
            resultExemplar.setInventoryNumber((Integer) exemplar[0]);
            resultExemplar.setShelf((String) exemplar[1]);
            resultExemplar.setCheckouts(null);
            resultExemplar.setParentBook(null);
            return resultExemplar;
        }).collect(Collectors.toList());
    }

    @Override
    public Optional<LocalDate> getClosestAvailableExemplarDate(String bookIsbn) {
        return bookRepository.findClosestExemplarAvailableDate(bookIsbn);
    }

    @Override
    public boolean addNewBook(AddBookDTO bookToAdd) {
        final String bookIsbn = bookToAdd.getIsbn();

        if(isValidBook(bookToAdd) && !bookRepository.existsById(bookIsbn)) {
            bookRepository.addBook(bookIsbn, bookToAdd.getTitle(), bookToAdd.getPublishingCity(),
                    bookToAdd.getPublisher(), bookToAdd.getPublishingYear(), bookToAdd.getPageNumber(),
                    bookToAdd.getPrice()
            );

            boolean authorsAdded = addAuthorsForBook(bookIsbn, bookToAdd.getAuthors());
            boolean areasAdded = false;
            if(authorsAdded) {
                areasAdded = addAreasForBook(bookIsbn, bookToAdd.getAreas());
            }
            return authorsAdded && areasAdded;
        }
        else {
            return false;
        }
    }

    @Override
    public boolean addExemplarForBook(String bookIsbn, Integer exemplarInventoryNumber) {
        return false;
    }

    @Override
    public boolean deleteBook(String isbn) {
        return false;
    }

    @Override
    public boolean bookExists(String bookIsbn) {
        return bookRepository.existsById(bookIsbn);
    }

    public boolean isValidBook(AddBookDTO bookToAdd) {
        return isNotNullOrBlank(bookToAdd.getIsbn())
                && bookToAdd.getIsbn().matches(ISBN_REGEXP)
                && isNotNullOrBlank(bookToAdd.getTitle())
                && isNotNullOrBlank(bookToAdd.getPublishingCity())
                && isNotNullOrBlank(bookToAdd.getPublisher())
                && bookToAdd.getPublishingYear() != null
                && bookToAdd.getPublishingYear() > 0
                && bookToAdd.getPageNumber() != null
                && bookToAdd.getPageNumber() > 0
                && bookToAdd.getPrice() != null
                && bookToAdd.getPrice().compareTo(BigDecimal.valueOf(0)) > 0
                && bookToAdd.getAuthors() != null
                && bookToAdd.getAreas() != null
                && !bookToAdd.getAreas().isEmpty();
    }

    @Override
    public boolean addAuthorsForBook(String bookIsbn, List<String> authorNames) {
        if(authorNames == null) {
            return false;
        }

        for(String authorName: authorNames) {
            String authorNameTrimmed = authorName.trim();
            if(authorNameTrimmed.isBlank() || bookHasAuthor(bookIsbn, authorName)) {
                return false;
            }
            else {
                bookRepository.addAuthorForBook(bookIsbn, authorName);
            }
        }
        return true;
    }

    @Override
    public boolean addAreasForBook(String bookIsbn, List<String> areaCiphers) {
        if(areaCiphers == null || areaCiphers.isEmpty()) {
            return false;
        }

        for(String areaCipher: areaCiphers) {
            String areaCipherTrimmed = areaCipher.trim();
            if(areaCipherTrimmed.isBlank() || bookHasArea(bookIsbn, areaCipher)) {
                return false;
            }
            else {
                bookRepository.addAreaForBook(bookIsbn, areaCipher);
            }
        }
        return true;
    }

    private boolean bookHasAuthor(String bookIsbn, String authorName) {
        return bookRepository.findBookByIsbnAndAuthor(bookIsbn, authorName).isPresent();
    }

    private boolean bookHasArea(String bookIsbn, String areaCipher) {
        return bookRepository.findBookByIsbnAndArea(bookIsbn, areaCipher).isPresent();
    }
}
