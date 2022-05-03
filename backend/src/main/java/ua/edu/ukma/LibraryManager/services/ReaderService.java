package ua.edu.ukma.LibraryManager.services;

import ua.edu.ukma.LibraryManager.models.dto.principal.RegisterReaderDTO;

public interface ReaderService {

    boolean readerExists(Integer ticketNumber);

    boolean addReader(RegisterReaderDTO readerToRegister, Integer principalId);

    boolean deleteReader(Integer ticketNumber);
}
