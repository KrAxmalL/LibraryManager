package ua.edu.ukma.LibraryManager.services;

import ua.edu.ukma.LibraryManager.models.dto.replacementAct.AddReplacementActDTO;

public interface ReplacementActService {

    boolean actExists(Integer actNumber);

    boolean addReplacementAct(Integer replacedExemplarNumber, AddReplacementActDTO replacementActToAdd);
}
