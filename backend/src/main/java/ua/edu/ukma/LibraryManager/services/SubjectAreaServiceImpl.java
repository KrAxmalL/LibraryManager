package ua.edu.ukma.LibraryManager.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.edu.ukma.LibraryManager.models.dto.mappers.SubjectAreaMapper;
import ua.edu.ukma.LibraryManager.models.dto.subjectArea.AddSubjectAreaDTO;
import ua.edu.ukma.LibraryManager.models.dto.subjectArea.SubjectAreaStatisticsDTO;
import ua.edu.ukma.LibraryManager.models.dto.subjectArea.SubjectAreaSummaryDTO;
import ua.edu.ukma.LibraryManager.repositories.SubjectAreaRepository;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class SubjectAreaServiceImpl implements SubjectAreaService {

    private final SubjectAreaRepository subjectAreaRepository;

    @Override
    public List<SubjectAreaSummaryDTO> getAllAreas() {
        return subjectAreaRepository.findAll().stream()
                                    .map(SubjectAreaMapper::toSubjectAreaSummaryDTO)
                                    .collect(Collectors.toList());
    }

    @Override
    public List<SubjectAreaStatisticsDTO> getStatisticsForSubjectAreasForPeriod(LocalDate startDate, LocalDate endDate) {
        List<Object[]> areas = subjectAreaRepository.findNumberOfTakenBooksForAllAreas(startDate, endDate);
        return areas.stream().map(area -> {
            SubjectAreaStatisticsDTO resDTO = new SubjectAreaStatisticsDTO();
            resDTO.setCipher(area[0].toString());
            resDTO.setSubjectAreaName(area[1].toString());
            resDTO.setTakenBooks(((BigInteger) area[2]).intValue());
            return resDTO;
        }).collect(Collectors.toList());
    }

    @Override
    public boolean addSubjectArea(AddSubjectAreaDTO areaToAdd) {
        if(!subjectAreaRepository.existsById(areaToAdd.getCipher())) {
            subjectAreaRepository.addSubjectArea(areaToAdd.getCipher(), areaToAdd.getSubjectAreaName());
            return subjectAreaRepository.existsById(areaToAdd.getCipher());
        }

        return false;
    }
}
