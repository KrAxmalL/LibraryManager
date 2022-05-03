package ua.edu.ukma.LibraryManager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ua.edu.ukma.LibraryManager.models.domain.Reader;

import java.util.List;
import java.util.Optional;

public interface ReaderRepository extends JpaRepository<Reader, Integer> {

    @Query(value = "SELECT principal_id FROM reader " +
                   "WHERE ticket_number = :target_ticket_number",
            nativeQuery = true)
    Optional<Integer> findIdOfPrincipal(@Param("target_ticket_number") Integer ticketNumber);

    @Query(value = "SELECT checkout_number FROM checkout_history "+
            "WHERE reader_ticket_number = :target_ticket_number " +
            "AND checkout_real_finish_date IS NULL",
            nativeQuery = true)
    List<Integer> findActiveCheckoutsOfReader(@Param("target_ticket_number") Integer ticketNumber);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "DELETE FROM reader " +
            "WHERE ticket_number = :target_ticket_number " +
            "AND NOT EXISTS (SELECT * FROM checkout_history " +
                            "WHERE checkout_real_finish_date IS NOT NULL " +
                            "AND reader_ticket_number = :target_ticket_number)",
            nativeQuery = true)
    void deleteReader(@Param("target_ticket_number") Integer ticketNumber);
}