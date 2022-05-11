package ua.edu.ukma.LibraryManager.services;

import ua.edu.ukma.LibraryManager.models.dto.replacementAct.AddReplacementActDTO;
import ua.edu.ukma.LibraryManager.models.dto.replacementAct.ReplacementActDetailsDTO;

import java.util.List;

public interface ReplacementActService {

    boolean actExists(Integer actNumber);

    List<ReplacementActDetailsDTO> getReplacementActsDetails();

    boolean addReplacementAct(Integer replacedExemplarNumber, AddReplacementActDTO replacementActToAdd);

    boolean deleteReplacementsOfBook(String bookIsbn);
}
