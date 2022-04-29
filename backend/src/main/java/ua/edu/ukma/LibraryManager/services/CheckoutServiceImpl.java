package ua.edu.ukma.LibraryManager.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.edu.ukma.LibraryManager.models.dto.checkout.CheckoutDetailsDTO;
import ua.edu.ukma.LibraryManager.repositories.CheckoutRepository;

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
            resCheckout.setCompensation((BigDecimal) checkoutObj[4]);
            resCheckout.setBookIsbn((String) checkoutObj[5]);
            resCheckout.setBookTitle((String) checkoutObj[6]);
            resCheckout.setExemplarInventoryNumber((Integer) checkoutObj[7]);
            return resCheckout;
        }).collect(Collectors.toList());
    }
}
