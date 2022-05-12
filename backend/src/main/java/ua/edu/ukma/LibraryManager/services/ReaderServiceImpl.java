package ua.edu.ukma.LibraryManager.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.edu.ukma.LibraryManager.models.domain.Reader;
import ua.edu.ukma.LibraryManager.models.dto.principal.AddReaderDTO;
import ua.edu.ukma.LibraryManager.models.dto.principal.RegisterReaderDTO;
import ua.edu.ukma.LibraryManager.models.dto.reader.OwerReaderDTO;
import ua.edu.ukma.LibraryManager.models.dto.reader.ReaderDetailsDTO;
import ua.edu.ukma.LibraryManager.models.dto.reader.ReaderReadBooksStatisticsDTO;
import ua.edu.ukma.LibraryManager.models.dto.reader.ReaderSummaryDTO;
import ua.edu.ukma.LibraryManager.repositories.ReaderRepository;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class ReaderServiceImpl implements ReaderService {

    private final ReaderRepository readerRepository;

    @Override
    public boolean readerExists(Integer ticketNumber) {
        return readerRepository.existsById(ticketNumber);
    }

    @Override
    public List<ReaderDetailsDTO> getAllReaders() {
        List<Reader> readers = readerRepository.findAll();
        return readers.stream().map(reader -> {
            ReaderDetailsDTO resDTO = new ReaderDetailsDTO();
            resDTO.setTicketNumber(reader.getTicketNumber());
            resDTO.setLastName(reader.getLastName());
            resDTO.setFirstName(reader.getFirstName());
            resDTO.setPatronymic(reader.getPatronymic());
            resDTO.setPhoneNumbers(reader.getPhoneNumbers());
            resDTO.setBirthDate(reader.getBirthDate());
            resDTO.setHomeCity(reader.getHomeCity());
            resDTO.setHomeStreet(reader.getHomeStreet());
            resDTO.setHomeBuildingNumber(reader.getHomeBuildingNumber());
            resDTO.setHomeFlatNumber(reader.getHomeFlatNumber());
            resDTO.setWorkPlace(reader.getWorkPlace());
            return resDTO;
        }).collect(Collectors.toList());
    }

    @Override
    public List<ReaderSummaryDTO> getReadersWhoReadBook(String bookIsbn) {
        List<Object[]> readers = readerRepository.findReadersWhoReadBook(bookIsbn);
        return readers.stream().map(reader -> {
            ReaderSummaryDTO resDTO = new ReaderSummaryDTO();
            resDTO.setTicketNumber((Integer) reader[0]);
            resDTO.setLastName(reader[1].toString());
            resDTO.setFirstName(reader[2].toString());
            resDTO.setPatronymic(reader[3].toString());
            resDTO.setPhoneNumbers(readerRepository.getPhonesOfReader((Integer) reader[0]));
            return resDTO;
        }).collect(Collectors.toList());
    }

    @Override
    public List<ReaderReadBooksStatisticsDTO> getReadersReadBooksStatistics() {
        List<Object[]> readers = readerRepository.findNumberOfReadBooksForAllReaders();
        return readers.stream().map(reader -> {
            ReaderReadBooksStatisticsDTO resDTO = new ReaderReadBooksStatisticsDTO();
            resDTO.setTicketNumber((Integer) reader[0]);
            resDTO.setLastName(reader[1].toString());
            resDTO.setFirstName(reader[2].toString());
            resDTO.setPatronymic(reader[3].toString());
            resDTO.setPhoneNumbers(readerRepository.getPhonesOfReader((Integer) reader[0]));
            resDTO.setReadBooks(((BigInteger) reader[4]).intValue());
            return resDTO;
        }).collect(Collectors.toList());
    }

    @Override
    public List<OwerReaderDTO> geOwerReaders() {
        List<Object[]> readers = readerRepository.findOwerReaders();
        return readers.stream().map(reader -> {
            OwerReaderDTO resDTO = new OwerReaderDTO();
            resDTO.setTicketNumber((Integer) reader[0]);
            resDTO.setLastName(reader[1].toString());
            resDTO.setFirstName(reader[2].toString());
            resDTO.setPatronymic(reader[3].toString());
            resDTO.setPhoneNumbers(readerRepository.getPhonesOfReader((Integer) reader[0]));
            resDTO.setDebtBooks(((BigInteger) reader[4]).intValue());
            return resDTO;
        }).collect(Collectors.toList());
    }

    @Override
    public List<ReaderSummaryDTO> getReadersWhoReadAllBooksFromArea(String areaCipher) {
        List<Object[]> readers = readerRepository.findReadersWhoReadAllBooksFromArea(areaCipher);
        return readers.stream().map(reader -> {
            ReaderSummaryDTO resDTO = new ReaderSummaryDTO();
            resDTO.setTicketNumber((Integer) reader[0]);
            resDTO.setLastName(reader[1].toString());
            resDTO.setFirstName(reader[2].toString());
            resDTO.setPatronymic(reader[3].toString());
            resDTO.setPhoneNumbers(readerRepository.getPhonesOfReader((Integer) reader[0]));
            return resDTO;
        }).collect(Collectors.toList());
    }

    @Override
    public List<ReaderSummaryDTO> getReadersWhoReadAtLeastOneBooksFromArea(String areaCipher) {
        List<Object[]> readers = readerRepository.findReadersWhoReadAtLeastOneBooksFromArea(areaCipher);
        return readers.stream().map(reader -> {
            ReaderSummaryDTO resDTO = new ReaderSummaryDTO();
            resDTO.setTicketNumber((Integer) reader[0]);
            resDTO.setLastName(reader[1].toString());
            resDTO.setFirstName(reader[2].toString());
            resDTO.setPatronymic(reader[3].toString());
            resDTO.setPhoneNumbers(readerRepository.getPhonesOfReader((Integer) reader[0]));
            return resDTO;
        }).collect(Collectors.toList());
    }

    @Override
    public Optional<Integer> getIdOfPrincipal(Integer ticketNumber) {
        if(ticketNumber != null && readerExists(ticketNumber)) {
            return readerRepository.findIdOfPrincipal(ticketNumber);
        }
        return Optional.empty();
    }

    @Override
    public boolean addReader(AddReaderDTO readerToAdd, Integer principalId) {
        readerRepository.addReader(readerToAdd.getLastName(), readerToAdd.getFirstName(),
                readerToAdd.getPatronymic(), readerToAdd.getBirthDate(), readerToAdd.getHomeCity(),
                readerToAdd.getHomeStreet(), readerToAdd.getHomeBuildingNumber(),
                readerToAdd.getHomeFlatNumber(), readerToAdd.getWorkPlace(), principalId);

        Optional<Integer> ticketNumberOpt = readerRepository.findReaderByPrincipalId(principalId);
        if(ticketNumberOpt.isPresent()) {
            Integer ticketNumber = ticketNumberOpt.get();
            readerToAdd.getPhoneNumbers().forEach(number -> readerRepository.addPhoneForReader(number, ticketNumber));

            return true;
        }
        return false;
    }

    @Override
    public boolean deleteReader(Integer ticketNumber) {
        if(ticketNumber != null && readerExists(ticketNumber)) {
            Optional<Integer> principalIdOpt = readerRepository.findIdOfPrincipal(ticketNumber);
            if(principalIdOpt.isPresent()) {
                List<Integer> activeCheckouts = readerRepository.findActiveCheckoutsOfReader(ticketNumber);
                if(activeCheckouts.isEmpty()) {
                    readerRepository.deleteReader(ticketNumber);
                    return !readerExists(ticketNumber);
                }
            }
        }

        return false;
    }
}
