package ua.edu.ukma.LibraryManager.services;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.edu.ukma.LibraryManager.models.Book;
import ua.edu.ukma.LibraryManager.models.BookExemplar;
import ua.edu.ukma.LibraryManager.repositories.BookRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

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
    public List<BookExemplar> getBookExemplars(String bookIsbn) {
        return bookRepository.findBookExemplars(bookIsbn);
    }

    @Override
    public List<BookExemplar> getAvailableExemplars(String bookIsbn) {
        return null;
    }

    @Override
    public LocalDate getClosestAvailableExemplarDate(String bookIsbn) {
        return null;
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
}
