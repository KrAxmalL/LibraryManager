package ua.edu.ukma.LibraryManager.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.edu.ukma.LibraryManager.models.dto.subjectArea.AddSubjectAreaDTO;
import ua.edu.ukma.LibraryManager.models.dto.subjectArea.SubjectAreaStatisticsDTO;
import ua.edu.ukma.LibraryManager.models.dto.subjectArea.SubjectAreaSummaryDTO;
import ua.edu.ukma.LibraryManager.services.SubjectAreaService;

import java.time.LocalDate;
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

    @GetMapping("/statistics/takenBooksForPeriod")
    public List<SubjectAreaStatisticsDTO> getTakenBooksForAreasForPeriod(@RequestParam(name = "startDate", required = true)
                                                                                  String startDateStr,
                                                                         @RequestParam(name = "endDate", required = true)
                                                                                  String endDateStr) {
        final LocalDate startDate = LocalDate.parse(startDateStr);
        final LocalDate endDate = LocalDate.parse(endDateStr);
        return subjectAreaService.getStatisticsForSubjectAreasForPeriod(startDate, endDate);
    }

    @PostMapping("")
    public ResponseEntity<Void> addNewSubjectArea(@RequestBody AddSubjectAreaDTO areaToAdd) {
        final boolean addedSuccessfully = subjectAreaService.addSubjectArea(areaToAdd);
        if(addedSuccessfully) {
            return ResponseEntity.noContent().build();
        }
        else {
            return ResponseEntity.badRequest().build();
        }
    }
}
