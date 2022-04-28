package ua.edu.ukma.LibraryManager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.edu.ukma.LibraryManager.models.domain.BookExemplar;

public interface BookExemplarRepository extends JpaRepository<BookExemplar, Integer> {
}