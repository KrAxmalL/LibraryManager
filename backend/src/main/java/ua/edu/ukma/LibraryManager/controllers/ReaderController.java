package ua.edu.ukma.LibraryManager.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.edu.ukma.LibraryManager.services.PrincipalService;
import ua.edu.ukma.LibraryManager.services.ReaderService;

@RestController
@RequestMapping("/api/readers")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class ReaderController {

    private final ReaderService readerService;
    private final PrincipalService principalService;

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
