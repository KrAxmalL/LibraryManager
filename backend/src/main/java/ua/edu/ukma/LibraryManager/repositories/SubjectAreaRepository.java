package ua.edu.ukma.LibraryManager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ua.edu.ukma.LibraryManager.models.domain.SubjectArea;

import java.time.LocalDate;
import java.util.List;

public interface SubjectAreaRepository extends JpaRepository<SubjectArea, String> {

    @Query(value = "SELECT subject_area.cipher, subject_area.subject_area_name, " +
                          "COUNT(checkouts_in_needed_period.checkout_number) AS checkouts " +
                   "FROM subject_area LEFT JOIN book_subject_area " +
                     "ON subject_area.cipher = book_subject_area.subject_area_cipher " +
                   "LEFT JOIN book_exemplar " +
                     "ON book_exemplar.book_isbn = book_subject_area.book_isbn " +
                   "LEFT JOIN (SELECT * FROM checkout_history " +
                              "WHERE checkout_history.checkout_start_date >= :target_start_date " +
                              "AND checkout_history.checkout_start_date <= :target_end_date) AS checkouts_in_needed_period " +
                     "ON checkouts_in_needed_period.exemplar_inventory_number = book_exemplar.inventory_number " +
                   "GROUP BY subject_area.cipher",
            nativeQuery = true)
    List<Object[]> findNumberOfTakenBooksForAllAreas(@Param("target_start_date") LocalDate startDate,
                                                     @Param("target_end_date") LocalDate endDate);
}