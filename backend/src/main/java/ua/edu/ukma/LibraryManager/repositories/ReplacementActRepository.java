package ua.edu.ukma.LibraryManager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.edu.ukma.LibraryManager.models.domain.ReplacementAct;

public interface ReplacementActRepository extends JpaRepository<ReplacementAct, Integer> {
}