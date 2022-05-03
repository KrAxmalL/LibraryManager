package ua.edu.ukma.LibraryManager.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.edu.ukma.LibraryManager.models.dto.bookExemplar.AddBookExemplarDTO;
import ua.edu.ukma.LibraryManager.models.dto.replacementAct.AddReplacementActDTO;
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

    @DeleteMapping("/{inventoryNumber}")
    public ResponseEntity<Void> deleteExemplar(@PathVariable(value = "inventoryNumber", required = true)
                                                           Integer inventoryNumber) {
        final boolean deletedSuccessfully = bookExemplarService.deleteExemplar(inventoryNumber);
        if(deletedSuccessfully) {
            return ResponseEntity.noContent().build();
        }
        else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{inventoryNumber}/replace")
    public ResponseEntity<Void> replaceExemplar(@PathVariable(value = "inventoryNumber", required = true)
                                                       Integer inventoryNumber,
                                                @RequestBody AddReplacementActDTO replacementData) {
        final boolean replacedSuccessfully = bookExemplarService.replaceExemplar(inventoryNumber, replacementData);
        if(replacedSuccessfully) {
            return ResponseEntity.noContent().build();
        }
        else {
            return ResponseEntity.badRequest().build();
        }
    }
}
