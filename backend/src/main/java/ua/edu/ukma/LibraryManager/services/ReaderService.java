package ua.edu.ukma.LibraryManager.services;

import ua.edu.ukma.LibraryManager.models.domain.Reader;
import ua.edu.ukma.LibraryManager.models.dto.principal.AddReaderDTO;
import ua.edu.ukma.LibraryManager.models.dto.principal.RegisterReaderDTO;
import ua.edu.ukma.LibraryManager.models.dto.reader.OwerReaderDTO;
import ua.edu.ukma.LibraryManager.models.dto.reader.ReaderDetailsDTO;
import ua.edu.ukma.LibraryManager.models.dto.reader.ReaderReadBooksStatisticsDTO;
import ua.edu.ukma.LibraryManager.models.dto.reader.ReaderSummaryDTO;

import java.util.List;
import java.util.Optional;

public interface ReaderService {

    boolean readerExists(Integer ticketNumber);

    List<ReaderDetailsDTO> getAllReaders();

    List<ReaderSummaryDTO> getReadersWhoReadBook(String bookIsbn);

    List<ReaderReadBooksStatisticsDTO> getReadersReadBooksStatistics();

    List<OwerReaderDTO> geOwerReaders();

    List<ReaderSummaryDTO> getReadersWhoReadAllBooksFromArea(String areaCipher);

    List<ReaderSummaryDTO> getReadersWhoReadAtLeastOneBooksFromArea(String areaCipher);

    Optional<Integer> getIdOfPrincipal(Integer ticketNumber);

    boolean addReader(AddReaderDTO addReaderDTO, Integer principalId);

    boolean deleteReader(Integer ticketNumber);
}
