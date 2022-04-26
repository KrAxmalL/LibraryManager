package ua.edu.ukma.LibraryManager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.edu.ukma.LibraryManager.models.ReplacementAct;

public interface ReplacementActRepository extends JpaRepository<ReplacementAct, Integer> {
}