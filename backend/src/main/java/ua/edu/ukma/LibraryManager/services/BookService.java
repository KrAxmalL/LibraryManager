package ua.edu.ukma.LibraryManager.services;

import ua.edu.ukma.LibraryManager.models.Book;
import ua.edu.ukma.LibraryManager.models.BookExemplar;
import ua.edu.ukma.LibraryManager.models.SubjectArea;

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

    LocalDate getClosestAvailableExemplarDate(String bookIsbn);

    boolean addAreasForBook(String bookIsbn, List<String> areaCiphers);

    boolean addExemplarForBook(String bookIsbn, Integer exemplarInventoryNumber);

    boolean deleteBook(String isbn);
}
