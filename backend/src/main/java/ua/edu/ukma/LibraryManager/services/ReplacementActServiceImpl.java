package ua.edu.ukma.LibraryManager.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.edu.ukma.LibraryManager.models.dto.replacementAct.AddReplacementActDTO;
import ua.edu.ukma.LibraryManager.models.dto.replacementAct.ReplacementActDetailsDTO;
import ua.edu.ukma.LibraryManager.repositories.ReplacementActRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    public List<ReplacementActDetailsDTO> getReplacementActsDetails() {
        List<Object[]> replacementActs = replacementActRepository.findReplacementActsDetails();
        return replacementActs.stream().map(act -> {
            ReplacementActDetailsDTO resDTO = new ReplacementActDetailsDTO();
            resDTO.setBookIsbn(act[0].toString());
            resDTO.setBookTitle(act[1].toString());
            resDTO.setReplacementActNumber((Integer) act[2]);
            resDTO.setReplacedExemplarInventoryNumber((Integer) act[3]);
            resDTO.setReplaceExemplarInventoryNumber((Integer) act[4]);
            resDTO.setReplacementDate(LocalDate.parse(act[5].toString()));
            resDTO.setCompensation(BigDecimal.valueOf((Double) act[6]));
            return resDTO;
        }).collect(Collectors.toList());
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
