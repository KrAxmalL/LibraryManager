package ua.edu.ukma.LibraryManager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.edu.ukma.LibraryManager.models.Reader;

public interface ReaderRepository extends JpaRepository<Reader, Integer> {
}