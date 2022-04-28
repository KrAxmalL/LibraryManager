package ua.edu.ukma.LibraryManager.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
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
