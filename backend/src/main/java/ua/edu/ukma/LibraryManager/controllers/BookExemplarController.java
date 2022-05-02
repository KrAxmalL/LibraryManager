package ua.edu.ukma.LibraryManager.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.edu.ukma.LibraryManager.models.dto.bookExemplar.AddBookExemplarDTO;
import ua.edu.ukma.LibraryManager.services.BookExemplarService;

@RestController
@RequestMapping("/api/exemplars")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class BookExemplarController {

    private final BookExemplarService bookExemplarService;

    @PostMapping("")
    public ResponseEntity<Void> addExemplarForBook(@RequestBody AddBookExemplarDTO exemplarToAdd) {
        final boolean addedSuccessfully = bookExemplarService.addExemplarForBook(exemplarToAdd);
        if(addedSuccessfully) {
            return ResponseEntity.noContent().build();
        }
        else {
            return ResponseEntity.badRequest().build();
        }
    }
}
