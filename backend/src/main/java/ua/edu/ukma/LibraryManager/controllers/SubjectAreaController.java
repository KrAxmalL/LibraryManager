package ua.edu.ukma.LibraryManager.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.edu.ukma.LibraryManager.models.dto.subjectArea.SubjectAreaSummaryDTO;
import ua.edu.ukma.LibraryManager.services.SubjectAreaService;

import java.util.List;

@RestController
@RequestMapping("/api/areas")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class SubjectAreaController {

    private final SubjectAreaService subjectAreaService;

    @GetMapping("")
    public List<SubjectAreaSummaryDTO> getAreas() {
        return subjectAreaService.getAllAreas();
    }

}
