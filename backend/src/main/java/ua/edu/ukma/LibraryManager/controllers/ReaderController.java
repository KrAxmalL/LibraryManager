package ua.edu.ukma.LibraryManager.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.edu.ukma.LibraryManager.models.domain.Reader;
import ua.edu.ukma.LibraryManager.models.dto.reader.ReaderDetailsDTO;
import ua.edu.ukma.LibraryManager.models.dto.reader.ReaderSummaryDTO;
import ua.edu.ukma.LibraryManager.services.PrincipalService;
import ua.edu.ukma.LibraryManager.services.ReaderService;

import java.util.List;

@RestController
@RequestMapping("/api/readers")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class ReaderController {

    private final ReaderService readerService;
    private final PrincipalService principalService;

    @GetMapping("")
    public List<ReaderDetailsDTO> getAllReaders() {
        return readerService.getAllReaders();
    }

    @GetMapping("/statistics/readBook")
    public List<ReaderSummaryDTO> getAllReadersWhoReadBook(@RequestParam(name = "isbn", required = true) String bookIsbn) {
        return readerService.getReadersWhoReadBook(bookIsbn);
    }

    @DeleteMapping("/{ticketNumber}")
    public ResponseEntity<Void> deleteReader(@PathVariable(required = true) Integer ticketNumber) {
        boolean deletedSuccessfully = principalService.deleteReader(ticketNumber);
        if(deletedSuccessfully) {
            return ResponseEntity.noContent().build();
        }
        else {
            return ResponseEntity.badRequest().build();
        }
    }
}
