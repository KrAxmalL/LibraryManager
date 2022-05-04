package ua.edu.ukma.LibraryManager.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.edu.ukma.LibraryManager.models.domain.Reader;
import ua.edu.ukma.LibraryManager.models.dto.principal.AddReaderDTO;
import ua.edu.ukma.LibraryManager.models.dto.principal.RegisterReaderDTO;
import ua.edu.ukma.LibraryManager.repositories.ReaderRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class ReaderServiceImpl implements ReaderService {

    private final ReaderRepository readerRepository;

    @Override
    public boolean readerExists(Integer ticketNumber) {
        return readerRepository.existsById(ticketNumber);
    }

    @Override
    public Optional<Integer> getIdOfPrincipal(Integer ticketNumber) {
        if(ticketNumber != null && readerExists(ticketNumber)) {
            return readerRepository.findIdOfPrincipal(ticketNumber);
        }
        return Optional.empty();
    }

    @Override
    public boolean addReader(AddReaderDTO readerToAdd, Integer principalId) {
        readerRepository.addReader(readerToAdd.getLastName(), readerToAdd.getFirstName(),
                readerToAdd.getPatronymic(), readerToAdd.getBirthDate(), readerToAdd.getHomeCity(),
                readerToAdd.getHomeStreet(), readerToAdd.getHomeBuildingNumber(),
                readerToAdd.getHomeFlatNumber(), readerToAdd.getWorkPlace(), principalId);

        Optional<Integer> ticketNumberOpt = readerRepository.findReaderByPrincipalId(principalId);
        if(ticketNumberOpt.isPresent()) {
            Integer ticketNumber = ticketNumberOpt.get();
            readerToAdd.getPhoneNumbers().forEach(number -> readerRepository.addPhoneForReader(number, ticketNumber));

            return true;
        }
        return false;
    }

    @Override
    public boolean deleteReader(Integer ticketNumber) {
        if(ticketNumber != null && readerExists(ticketNumber)) {
            Optional<Integer> principalIdOpt = readerRepository.findIdOfPrincipal(ticketNumber);
            if(principalIdOpt.isPresent()) {
                List<Integer> activeCheckouts = readerRepository.findActiveCheckoutsOfReader(ticketNumber);
                if(activeCheckouts.isEmpty()) {
                    readerRepository.deleteReader(ticketNumber);
                    return !readerExists(ticketNumber);
                }
            }
        }

        return false;
    }
}
