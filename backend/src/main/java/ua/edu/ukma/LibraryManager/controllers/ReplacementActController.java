package ua.edu.ukma.LibraryManager.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.edu.ukma.LibraryManager.models.dto.replacementAct.ReplacementActDetailsDTO;
import ua.edu.ukma.LibraryManager.services.ReplacementActService;

import java.util.List;

@RestController
@RequestMapping("/api/replacements")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class ReplacementActController {

    private final ReplacementActService replacementActService;

    @GetMapping("")
    public List<ReplacementActDetailsDTO> getReplacementActsDetails() {
        return replacementActService.getReplacementActsDetails();
    }
}
