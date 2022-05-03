package ua.edu.ukma.LibraryManager.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.edu.ukma.LibraryManager.models.domain.Checkout;
import ua.edu.ukma.LibraryManager.models.dto.checkout.AddCheckoutDTO;
import ua.edu.ukma.LibraryManager.models.dto.checkout.CheckoutDetailsDTO;
import ua.edu.ukma.LibraryManager.models.dto.checkout.FinishCheckoutDTO;
import ua.edu.ukma.LibraryManager.repositories.CheckoutRepository;
import ua.edu.ukma.LibraryManager.utils.StringUtils;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class CheckoutServiceImpl implements CheckoutService {

    private final CheckoutRepository checkoutRepository;
    private final BookExemplarService bookExemplarService;
    private final ReaderService readerService;

    @Override
    public List<CheckoutDetailsDTO> getCheckoutOfUser(String readerEmail) {
        List<Object[]> checkoutsObj = checkoutRepository.findCheckoutsOfReader(readerEmail);
        return checkoutsObj.stream().map(checkoutObj -> {
            CheckoutDetailsDTO resCheckout = new CheckoutDetailsDTO();
            resCheckout.setCheckoutNumber((Integer) checkoutObj[0]);
            resCheckout.setCheckoutStartDate(LocalDate.parse(checkoutObj[1].toString()));
            resCheckout.setCheckoutExpectedFinishDate(LocalDate.parse(checkoutObj[2].toString()));
            Object realFinishDateObj = checkoutObj[3];
            LocalDate realFinishDate =
                    realFinishDateObj == null
                    ? null
                    : LocalDate.parse(realFinishDateObj.toString());
            resCheckout.setCheckoutRealFinishDate(realFinishDate);
            resCheckout.setBookIsbn((String) checkoutObj[4]);
            resCheckout.setBookTitle((String) checkoutObj[5]);
            resCheckout.setExemplarInventoryNumber((Integer) checkoutObj[6]);
            return resCheckout;
        }).collect(Collectors.toList());
    }

    @Override
    public boolean addNewCheckout(AddCheckoutDTO checkoutToAdd) {
        if(isValidCheckout(checkoutToAdd)) {
            boolean readerExists = readerService.readerExists(checkoutToAdd.getReaderTicketNumber());
            if(readerExists) {
                boolean exemplarAvailable = bookExemplarService.exemplarIsAvailableForCheckout(
                        checkoutToAdd.getExemplarInventoryNumber());
                if(exemplarAvailable) {
                    checkoutRepository.addNewCheckout(checkoutToAdd.getStartDate(), checkoutToAdd.getExpectedFinishDate(),
                            checkoutToAdd.getExemplarInventoryNumber(), checkoutToAdd.getReaderTicketNumber());
                    return true;
                }
            }
        }
        return false;
    }

    @Override
    public boolean finishCheckout(Integer checkoutNumber, FinishCheckoutDTO checkoutToFinish) {
        if(checkoutToFinish.getRealFinishDate() != null
            && StringUtils.isNotNullOrBlank(checkoutToFinish.getNewShelfForExemplar())) {
            checkoutToFinish.setNewShelfForExemplar(checkoutToFinish.getNewShelfForExemplar().trim());

            Optional<Checkout> checkoutOpt = checkoutRepository.findById(checkoutNumber);
            if(checkoutOpt.isPresent()) {
                Checkout checkout = checkoutOpt.get();
                if(checkout.getRealFinishDate() == null) {
                    Integer exemplarInventoryNumber = checkout.getExemplar().getInventoryNumber();
                    checkoutRepository.setRealFinishDateForCheckout(
                            checkoutNumber, checkoutToFinish.getRealFinishDate());
                    return bookExemplarService.changeShelfForExemplar(exemplarInventoryNumber,
                            checkoutToFinish.getNewShelfForExemplar());
                }
            }
        }
        return false;
    }

    public boolean isValidCheckout(AddCheckoutDTO checkoutToAdd) {
        return checkoutToAdd.getExemplarInventoryNumber() != null
                && checkoutToAdd.getReaderTicketNumber() != null
                && checkoutToAdd.getStartDate() != null
                && checkoutToAdd.getExpectedFinishDate() != null
                && checkoutToAdd.getExpectedFinishDate().isAfter(checkoutToAdd.getStartDate());
    }
}
