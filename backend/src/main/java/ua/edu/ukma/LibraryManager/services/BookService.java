package ua.edu.ukma.LibraryManager.services;

import ua.edu.ukma.LibraryManager.models.domain.Book;
import ua.edu.ukma.LibraryManager.models.domain.BookExemplar;
import ua.edu.ukma.LibraryManager.models.dto.book.AddBookDTO;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BookService {

    List<Book> getAllBooks();

    Optional<Book> getBookByIsbn(String isbn);

    List<Book> getBooksOfSubjectArea(String areaCipher);

    List<Book> getBooksOfAuthor(String authorName);

    List<Book> getBooksByTitle(String title);

    List<Book> getBooksOfAuthorAndTitle(String title, List<String> authors);

    List<Book> getBooksOfAreaAndTitle(String title, List<String> areasIds);

    List<Book> getBooksOfAuthorAndAreaAndTitle(String title, List<String> authors, List<String> areasIds);

    List<String> getAllAuthors();

    List<BookExemplar> getBookExemplars(String bookIsbn);

    List<BookExemplar> getAvailableExemplars(String bookIsbn);

    Optional<LocalDate> getClosestAvailableExemplarDate(String bookIsbn);

    boolean addNewBook(AddBookDTO bookToAdd);

    boolean addAuthorsForBook(String bookIsbn, List<String> authorNames);

    boolean addAreasForBook(String bookIsbn, List<String> areaCiphers);

    boolean addExemplarForBook(String bookIsbn, Integer exemplarInventoryNumber);

    boolean deleteBook(String isbn);

    boolean bookExists(String bookIsbn);
}
