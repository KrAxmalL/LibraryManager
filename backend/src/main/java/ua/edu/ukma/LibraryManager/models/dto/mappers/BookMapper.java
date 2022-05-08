package ua.edu.ukma.LibraryManager.models.dto.mappers;

import ua.edu.ukma.LibraryManager.models.domain.Book;
import ua.edu.ukma.LibraryManager.models.domain.BookExemplar;
import ua.edu.ukma.LibraryManager.models.domain.SubjectArea;
import ua.edu.ukma.LibraryManager.models.dto.book.LibrarianBookDetailsDTO;
import ua.edu.ukma.LibraryManager.models.dto.book.ReaderBookDetailsDTO;
import ua.edu.ukma.LibraryManager.models.dto.book.BookSummaryDTO;

import java.util.List;
import java.util.stream.Collectors;

public class BookMapper {

    public static BookSummaryDTO toBookSummaryDTO(Book book) {
        BookSummaryDTO resDTO = new BookSummaryDTO();
        resDTO.setIsbn(book.getIsbn());
        resDTO.setTitle(book.getTitle());
        final List<String> areasNames = book.getAreas()
                                            .stream()
                                            .map(SubjectArea::getSubjectAreaName)
                                            .collect(Collectors.toList());
        resDTO.setAreas(areasNames);
        resDTO.setAuthors(book.getAuthors());
        return resDTO;
    }

    public static ReaderBookDetailsDTO toReaderBookDetailsDTO(Book book) {
        ReaderBookDetailsDTO resDTO = new ReaderBookDetailsDTO();
        resDTO.setIsbn(book.getIsbn());
        resDTO.setTitle(book.getTitle());
        final List<String> areasNames = book.getAreas()
                .stream()
                .map(SubjectArea::getSubjectAreaName)
                .collect(Collectors.toList());
        resDTO.setAreas(areasNames);
        resDTO.setAuthors(book.getAuthors());
        resDTO.setAvailableExemplars(null);
        resDTO.setClosestAvailableExemplar(null);
        resDTO.setPublishingCity(book.getPublishingCity());
        resDTO.setPublisher(book.getPublisher());
        resDTO.setPublishingYear(book.getPublishingYear());
        resDTO.setPageNumber(book.getPageNumber());
        return resDTO;
    }

    public static LibrarianBookDetailsDTO toLibrarianBookDetailsDTO(Book book) {
        LibrarianBookDetailsDTO resDTO = new LibrarianBookDetailsDTO();
        resDTO.setIsbn(book.getIsbn());
        resDTO.setTitle(book.getTitle());
        final List<String> areasNames = book.getAreas()
                .stream()
                .map(SubjectArea::getSubjectAreaName)
                .collect(Collectors.toList());
        resDTO.setAreas(areasNames);
        resDTO.setAuthors(book.getAuthors());
        resDTO.setPublishingCity(book.getPublishingCity());
        resDTO.setPublisher(book.getPublisher());
        resDTO.setPublishingYear(book.getPublishingYear());
        resDTO.setPageNumber(book.getPageNumber());
        resDTO.setExemplars(book.getExemplars().stream()
                                               .map(BookExemplar::getInventoryNumber)
                                               .collect(Collectors.toList()));
        resDTO.setPrice(book.getPrice());
        return resDTO;
    }
}
