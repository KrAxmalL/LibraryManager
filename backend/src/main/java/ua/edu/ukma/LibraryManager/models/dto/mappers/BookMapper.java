package ua.edu.ukma.LibraryManager.models.dto.mappers;

import ua.edu.ukma.LibraryManager.models.domain.Book;
import ua.edu.ukma.LibraryManager.models.domain.SubjectArea;
import ua.edu.ukma.LibraryManager.models.dto.book.BookDetailsDTO;
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

    public static BookDetailsDTO toBookDetailsDTO(Book book) {
        BookDetailsDTO resDTO = new BookDetailsDTO();
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
}
