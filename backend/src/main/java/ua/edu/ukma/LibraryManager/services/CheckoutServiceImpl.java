package ua.edu.ukma.LibraryManager.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.edu.ukma.LibraryManager.models.dto.checkout.CheckoutDetailsDTO;
import ua.edu.ukma.LibraryManager.repositories.CheckoutRepository;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class CheckoutServiceImpl implements CheckoutService {

    private final CheckoutRepository checkoutRepository;

    @Override
    public List<CheckoutDetailsDTO> getCheckoutOfUser(String readerEmail) {
        List<Object[]> checkoutsObj = checkoutRepository.findCheckoutsOfReader(readerEmail);
        return null;
    }
}
