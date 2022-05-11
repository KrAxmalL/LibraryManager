package ua.edu.ukma.LibraryManager.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.edu.ukma.LibraryManager.models.domain.Book;
import ua.edu.ukma.LibraryManager.models.domain.BookExemplar;
import ua.edu.ukma.LibraryManager.models.dto.book.*;
import ua.edu.ukma.LibraryManager.models.dto.mappers.BookMapper;
import ua.edu.ukma.LibraryManager.security.jwt.JWTManager;
import ua.edu.ukma.LibraryManager.services.BookService;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class BookController {

    private static final int BEARER_LENGTH = "Bearer ".length();

    private final BookService bookService;
    private final JWTManager jwtManager;

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
    public Object getBook(@PathVariable(name = "isbn", required = true) String isbn,
                                                           @RequestHeader HttpHeaders headers) {
        List<String> authorizationHeaderValues = headers.get(HttpHeaders.AUTHORIZATION);
        log.info("authorization header value: " + authorizationHeaderValues.get(0));
        String accessToken = authorizationHeaderValues.get(0).substring(BEARER_LENGTH);
        List<String> roles = jwtManager.getRoles(accessToken);

        Optional<Book> bookOpt = bookService.getBookByIsbn(isbn);
        if(roles.contains("LIBRARIAN")) {
            return bookOpt.map(book -> ResponseEntity.ok().body(BookMapper.toLibrarianBookDetailsDTO(book)))
                    .orElseGet(() -> ResponseEntity.notFound().build());
        }
        else if(roles.contains("READER")) {
            ReaderBookDetailsDTO resultBook = BookMapper.toReaderBookDetailsDTO(bookOpt.get());
            List<BookExemplar> availableExemplars = bookService.getAvailableExemplars(resultBook.getIsbn());
            List<Integer> exemplarsIds = availableExemplars.stream()
                    .map(BookExemplar::getInventoryNumber)
                    .collect(Collectors.toList());
            resultBook.setAvailableExemplars(exemplarsIds);
            if(exemplarsIds.isEmpty()) {
                Optional<LocalDate> closestDate = bookService.getClosestAvailableExemplarDate(resultBook.getIsbn());
                resultBook.setClosestAvailableExemplar(closestDate.orElse(null));
            }
            return ResponseEntity.ok().body(resultBook);
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/authors")
    public List<String> getAllAuthors() {
        return bookService.getAllAuthors();
    }

    @PostMapping("")
    public ResponseEntity<Void> addNewBook(@RequestBody(required = true) AddBookDTO bookToAdd) {
        log.info(bookToAdd.toString());
        final boolean addedSuccessfully = bookService.addNewBook(bookToAdd);
        if(addedSuccessfully) {
            return ResponseEntity.noContent().build();
        }
        else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PatchMapping("/{isbn}")
    public ResponseEntity<Void> addNewBook(@PathVariable(name = "isbn", required = true) String isbn,
                                           @RequestBody(required = true) SetAreasForBookDTO areasToSet) {
        final boolean setSuccessfully = bookService.setAreasForBook(isbn, areasToSet.getAreaCiphers());
        if(setSuccessfully) {
            return ResponseEntity.noContent().build();
        }
        else {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{isbn}")
    public ResponseEntity<Void> deleteBook(@PathVariable(name = "isbn", required = true) String isbn) {
        boolean deletedSuccessfully = bookService.deleteBook(isbn);
        if(deletedSuccessfully) {
            return ResponseEntity.noContent().build();
        }
        else {
            return ResponseEntity.badRequest().build();
        }
    }
}
