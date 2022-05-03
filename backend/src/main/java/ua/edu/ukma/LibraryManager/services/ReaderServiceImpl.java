package ua.edu.ukma.LibraryManager.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.edu.ukma.LibraryManager.models.domain.Reader;
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
    public boolean addReader(RegisterReaderDTO readerToRegister, Integer principalId) {
        readerRepository.addReader(readerToRegister.getLastName(), readerToRegister.getFirstName(),
                readerToRegister.getPatronymic(), readerToRegister.getBirthDate(), readerToRegister.getHomeCity(),
                readerToRegister.getHomeStreet(), readerToRegister.getHomeBuildingNumber(),
                readerToRegister.getHomeFlatNumber(), readerToRegister.getWorkPlace(), principalId);

        return readerRepository.findReaderByPrincipalId(principalId).isPresent();
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
