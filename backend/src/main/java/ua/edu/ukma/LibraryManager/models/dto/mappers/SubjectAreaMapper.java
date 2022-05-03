package ua.edu.ukma.LibraryManager.models.dto.mappers;

import ua.edu.ukma.LibraryManager.models.domain.SubjectArea;
import ua.edu.ukma.LibraryManager.models.dto.subjectArea.SubjectAreaSummaryDTO;

public class SubjectAreaMapper {

    public static SubjectAreaSummaryDTO toSubjectAreaSummaryDTO(SubjectArea subjectArea) {
        SubjectAreaSummaryDTO resDto = new SubjectAreaSummaryDTO();
        resDto.setCipher(subjectArea.getCipher());
        resDto.setSubjectAreaName(subjectArea.getSubjectAreaName());
        return resDto;
    }
}
