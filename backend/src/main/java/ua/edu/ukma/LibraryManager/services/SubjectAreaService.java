package ua.edu.ukma.LibraryManager.services;

import ua.edu.ukma.LibraryManager.models.dto.subjectArea.SubjectAreaStatisticsDTO;
import ua.edu.ukma.LibraryManager.models.dto.subjectArea.SubjectAreaSummaryDTO;

import java.time.LocalDate;
import java.util.List;

public interface SubjectAreaService {

    List<SubjectAreaSummaryDTO> getAllAreas();

    List<SubjectAreaStatisticsDTO> getStatisticsForSubjectAreasForPeriod(LocalDate startDate, LocalDate endDate);
}
