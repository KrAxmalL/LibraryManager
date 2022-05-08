package ua.edu.ukma.LibraryManager.services;

import ua.edu.ukma.LibraryManager.models.domain.Reader;
import ua.edu.ukma.LibraryManager.models.dto.principal.AddReaderDTO;
import ua.edu.ukma.LibraryManager.models.dto.principal.RegisterReaderDTO;
import ua.edu.ukma.LibraryManager.models.dto.reader.ReaderDetailsDTO;

import java.util.List;
import java.util.Optional;

public interface ReaderService {

    boolean readerExists(Integer ticketNumber);

    List<ReaderDetailsDTO> getAllReaders();

    Optional<Integer> getIdOfPrincipal(Integer ticketNumber);

    boolean addReader(AddReaderDTO addReaderDTO, Integer principalId);

    boolean deleteReader(Integer ticketNumber);
}
