package ua.edu.ukma.LibraryManager.services;

public interface ReaderService {

    boolean readerExists(Integer ticketNumber);

    boolean deleteReader(Integer ticketNumber);
}
