package ua.edu.ukma.LibraryManager.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.edu.ukma.LibraryManager.models.dto.mappers.SubjectAreaMapper;
import ua.edu.ukma.LibraryManager.models.dto.subjectArea.SubjectAreaSummaryDTO;
import ua.edu.ukma.LibraryManager.repositories.SubjectAreaRepository;

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
}
