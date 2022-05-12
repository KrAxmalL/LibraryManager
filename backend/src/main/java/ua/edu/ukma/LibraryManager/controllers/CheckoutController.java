package ua.edu.ukma.LibraryManager.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.edu.ukma.LibraryManager.models.domain.BookExemplar;
import ua.edu.ukma.LibraryManager.models.domain.Checkout;
import ua.edu.ukma.LibraryManager.models.dto.book.ReaderBookDetailsDTO;
import ua.edu.ukma.LibraryManager.models.dto.checkout.*;
import ua.edu.ukma.LibraryManager.models.dto.mappers.BookMapper;
import ua.edu.ukma.LibraryManager.repositories.CheckoutRepository;
import ua.edu.ukma.LibraryManager.security.jwt.JWTManager;
import ua.edu.ukma.LibraryManager.services.CheckoutService;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/checkouts")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class CheckoutController {

    private static final int BEARER_LENGTH = "Bearer ".length();

    private final CheckoutService checkoutService;
    private final JWTManager jwtManager;

    @GetMapping("")
    public Object getCheckouts(@RequestHeader HttpHeaders headers) {
        List<String> authorizationHeaderValues = headers.get(HttpHeaders.AUTHORIZATION);
        log.info("authorization header value: " + authorizationHeaderValues.get(0));
        String accessToken = authorizationHeaderValues.get(0).substring(BEARER_LENGTH);
        List<String> roles = jwtManager.getRoles(accessToken);

        if(roles.contains("LIBRARIAN") || roles.contains("ADMINISTRATOR")) {
            return ResponseEntity.ok().body(checkoutService.getAllCheckouts());
        }
        else if(roles.contains("READER")) {
            String readerEmail = jwtManager.getEmail(accessToken);
            return ResponseEntity.ok().body(checkoutService.getCheckoutOfUser(readerEmail));
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
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

    @PatchMapping("/{checkoutNumber}/finish")
    public ResponseEntity<Void> finishCheckout(@PathVariable(name = "checkoutNumber", required = true) Integer checkoutNumber,
                                            @RequestBody(required = true) FinishCheckoutDTO checkoutToFinish) {
        log.info("checkoutNumber: " + checkoutNumber.toString());
        log.info("checkoutToFinish: " + checkoutToFinish.toString());
        boolean finishedSuccessfully = checkoutService.finishCheckout(checkoutNumber, checkoutToFinish);
        if(finishedSuccessfully) {
            return ResponseEntity.noContent().build();
        }
        else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PatchMapping("/{checkoutNumber}/continue")
    public ResponseEntity<Void> continueCheckout(@PathVariable(name = "checkoutNumber", required = true) Integer checkoutNumber,
                                            @RequestBody(required = true) ContinueCheckoutDTO checkoutToContinue) {
        log.info("checkoutNumber: " + checkoutNumber.toString());
        log.info("newFinishDate: " + checkoutToContinue.getNewExpectedFinishDate().toString());
        boolean continuedSuccessfully = checkoutService.continueCheckout(checkoutNumber, checkoutToContinue);
        if(continuedSuccessfully) {
            return ResponseEntity.noContent().build();
        }
        else {
            return ResponseEntity.badRequest().build();
        }
    }
}
