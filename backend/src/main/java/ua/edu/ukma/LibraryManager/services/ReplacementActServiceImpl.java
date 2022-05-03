package ua.edu.ukma.LibraryManager.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.edu.ukma.LibraryManager.models.dto.replacementAct.AddReplacementActDTO;
import ua.edu.ukma.LibraryManager.repositories.ReplacementActRepository;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class ReplacementActServiceImpl implements ReplacementActService {

    private final ReplacementActRepository replacementActRepository;

    @Override
    public boolean actExists(Integer actNumber) {
        return replacementActRepository.existsById(actNumber);
    }

    @Override
    public boolean addReplacementAct(Integer replacedExemplarNumber, AddReplacementActDTO replacementActToAdd) {
        Optional<Integer> actForReplacedExemplarOpt = replacementActRepository.findReplacementActForExemplar(replacedExemplarNumber);
        if(actForReplacedExemplarOpt.isEmpty()) {
            replacementActRepository.addReplacementAct(replacementActToAdd.getReplacementDate(),
                    replacedExemplarNumber, replacementActToAdd.getNewExemplarInventoryNumber());
            return replacementActRepository.findReplacementActForExemplar(replacedExemplarNumber).isPresent();
        }

        return false;
    }
}
