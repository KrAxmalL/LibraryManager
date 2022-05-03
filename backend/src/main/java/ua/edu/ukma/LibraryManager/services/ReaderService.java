package ua.edu.ukma.LibraryManager.services;

import ua.edu.ukma.LibraryManager.models.dto.principal.RegisterReaderDTO;

import java.util.Optional;

public interface ReaderService {

    boolean readerExists(Integer ticketNumber);

    Optional<Integer> getIdOfPrincipal(Integer ticketNumber);

    boolean addReader(RegisterReaderDTO readerToRegister, Integer principalId);

    boolean deleteReader(Integer ticketNumber);
}
