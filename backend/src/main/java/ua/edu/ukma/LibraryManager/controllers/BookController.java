package ua.edu.ukma.LibraryManager.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.edu.ukma.LibraryManager.models.domain.Book;
import ua.edu.ukma.LibraryManager.models.domain.BookExemplar;
import ua.edu.ukma.LibraryManager.models.dto.book.BookDetailsDTO;
import ua.edu.ukma.LibraryManager.models.dto.book.BookSummaryDTO;
import ua.edu.ukma.LibraryManager.models.dto.mappers.BookMapper;
import ua.edu.ukma.LibraryManager.services.BookService;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class BookController {

    private final BookService bookService;

    @GetMapping("")
    public List<BookSummaryDTO> getBooks(@RequestParam(name = "title", required = false) Optional<String> titleOpt,
                               @RequestParam(name = "author", required = false) Optional<List<String>> authorsOpt,
                               @RequestParam(name = "area", required = false) Optional<List<String>> areasIdsOpt) {

        final boolean titleEmpty = titleOpt.isEmpty();
        final boolean authorsEmpty = authorsOpt.isEmpty();
        final boolean areasIdsEmpty = areasIdsOpt.isEmpty();

        final String title = titleOpt.orElse("");

        List<Book> resultBooks = null;

        if(titleEmpty && authorsEmpty && areasIdsEmpty) {
            resultBooks = bookService.getAllBooks();
        }
        else if (authorsEmpty && areasIdsEmpty) {
            resultBooks = bookService.getBooksByTitle(title);
        }
        else if (authorsEmpty) {
            resultBooks = bookService.getBooksOfAreaAndTitle(title, areasIdsOpt.get());
        }
        else if (areasIdsEmpty) {
            resultBooks = bookService.getBooksOfAuthorAndTitle(title, authorsOpt.get());
        }
        else {
            resultBooks = bookService.getBooksOfAuthorAndAreaAndTitle(title, authorsOpt.get(), areasIdsOpt.get());
        }

        return resultBooks.stream()
                          .map(BookMapper::toBookSummaryDTO)
                          .collect(Collectors.toList());
    }

    @GetMapping("/{isbn}")
    public ResponseEntity<BookDetailsDTO> getBook(@PathVariable(name = "isbn", required = true) String isbn,
                                  @RequestParam(name = "checkoutDetails", required = true, defaultValue = "false")
                                Boolean checkoutDetailsNeeded) {

        Optional<Book> bookOpt = bookService.getBookByIsbn(isbn);
        if(bookOpt.isPresent()) {
            Book book = bookOpt.get();
            BookDetailsDTO resultBook = BookMapper.toBookDetailsDTO(book);
            if (checkoutDetailsNeeded) {
                List<BookExemplar> availableExemplars = bookService.getAvailableExemplars(resultBook.getIsbn());
                if(availableExemplars.isEmpty()) {
                    Optional<LocalDate> closestDate = bookService.getClosestAvailableExemplarDate(resultBook.getIsbn());
                    resultBook.setClosestAvailableExemplar(closestDate.orElse(null));
                }
                else {
                    List<Integer> exemplarsIds = availableExemplars.stream()
                                                                   .map(BookExemplar::getInventoryNumber)
                                                                   .collect(Collectors.toList());
                    resultBook.setAvailableExemplars(exemplarsIds);
                }
            }
            return ResponseEntity.ok().body(resultBook);
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/authors")
    public List<String> getAllAuthors() {
        return bookService.getAllAuthors();
    }
}
