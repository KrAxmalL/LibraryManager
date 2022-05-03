package ua.edu.ukma.LibraryManager.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.edu.ukma.LibraryManager.models.domain.Reader;
import ua.edu.ukma.LibraryManager.repositories.ReaderRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class ReaderServiceImpl implements ReaderService {

    private final ReaderRepository readerRepository;
    private final PrincipalService principalService;

    @Override
    public boolean readerExists(Integer ticketNumber) {
        return readerRepository.existsById(ticketNumber);
    }

    @Override
    public boolean deleteReader(Integer ticketNumber) {
        if(ticketNumber != null && readerExists(ticketNumber)) {
            Optional<Integer> principalIdOpt = readerRepository.findIdOfPrincipal(ticketNumber);
            if(principalIdOpt.isPresent()) {
                List<Integer> activeCheckouts = readerRepository.findActiveCheckoutsOfReader(ticketNumber);
                if(activeCheckouts.isEmpty()) {
                    readerRepository.deleteReader(ticketNumber);
                    boolean principalDeleted = principalService.deletePrincipal(principalIdOpt.get());
                    return principalDeleted && !readerExists(ticketNumber);
                }
            }
        }

        return false;
    }
}
