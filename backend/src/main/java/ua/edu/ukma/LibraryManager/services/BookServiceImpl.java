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

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
        //todo: add check if subject area cipher exists and authors in list are not empty
        if(isValidBook(bookToAdd) && !bookRepository.existsById(bookIsbn)) {
            bookRepository.addBook(bookIsbn, bookToAdd.getTitle(), bookToAdd.getPublishingCity(),
                    bookToAdd.getPublisher(), bookToAdd.getPublishingYear(), bookToAdd.getPageNumber(),
                    bookToAdd.getPrice()
            );
            bookToAdd.getAuthors().forEach(authorName -> bookRepository.addAuthorForBook(bookIsbn, authorName));
            bookToAdd.getAreas().forEach(areaCipher -> bookRepository.addAreaForBook(bookIsbn, areaCipher));
            return true;
        }
        else {
            return false;
        }
    }

    @Override
    public boolean addAreasForBook(String bookIsbn, List<String> areaCiphers) {
        return false;
    }

    @Override
    public boolean addExemplarForBook(String bookIsbn, Integer exemplarInventoryNumber) {
        return false;
    }

    @Override
    public boolean deleteBook(String isbn) {
        return false;
    }

    public boolean isValidBook(AddBookDTO bookToAdd) {
        return isNotNullOrBlank(bookToAdd.getIsbn())
                && bookToAdd.getIsbn().matches(ISBN_REGEXP)
                && isNotNullOrBlank(bookToAdd.getTitle())
                && isNotNullOrBlank(bookToAdd.getPublishingCity())
                && isNotNullOrBlank(bookToAdd.getPublisher())
                && bookToAdd.getPublishingYear() != null
                && bookToAdd.getPageNumber() != null
                && bookToAdd.getPrice() != null
                && bookToAdd.getAuthors() != null
                && bookToAdd.getAreas() != null
                && !bookToAdd.getAreas().isEmpty();
    }

    private boolean isNotNullOrBlank(String str) {
        return str != null && !str.isBlank();
    }
}
