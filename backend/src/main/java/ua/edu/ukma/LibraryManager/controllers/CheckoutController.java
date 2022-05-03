package ua.edu.ukma.LibraryManager.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.edu.ukma.LibraryManager.models.domain.Checkout;
import ua.edu.ukma.LibraryManager.models.dto.checkout.AddCheckoutDTO;
import ua.edu.ukma.LibraryManager.models.dto.checkout.CheckoutDetailsDTO;
import ua.edu.ukma.LibraryManager.repositories.CheckoutRepository;
import ua.edu.ukma.LibraryManager.services.CheckoutService;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/checkouts")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class CheckoutController {

    private final CheckoutService checkoutService;

    @GetMapping("")
    public List<CheckoutDetailsDTO> getCheckoutsForReader(@RequestParam(name = "readerEmail", required = true) String readerEmail) {
        //todo: replace with reading email from jwt
        return checkoutService.getCheckoutOfUser(readerEmail);
    }

    @PostMapping("")
    public ResponseEntity<Void> addCheckout(@RequestBody(required = true) AddCheckoutDTO checkoutToAdd) {
        log.info("checkout to add: " + checkoutToAdd.toString());
        boolean addedSuccessfully = checkoutService.addNewCheckout(checkoutToAdd);
        if(addedSuccessfully) {
            return ResponseEntity.noContent().build();
        }
        else {
            return ResponseEntity.badRequest().build();
        }
    }
}
