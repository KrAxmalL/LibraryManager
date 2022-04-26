package ua.edu.ukma.LibraryManager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.edu.ukma.LibraryManager.models.SubjectArea;

public interface SubjectAreaRepository extends JpaRepository<SubjectArea, String> {
}