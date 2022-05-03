package ua.edu.ukma.LibraryManager.services;

import ua.edu.ukma.LibraryManager.models.dto.subjectArea.SubjectAreaSummaryDTO;

import java.util.List;

public interface SubjectAreaService {

    List<SubjectAreaSummaryDTO> getAllAreas();
}
