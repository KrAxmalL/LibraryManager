package ua.edu.ukma.LibraryManager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ua.edu.ukma.LibraryManager.models.domain.Reader;

import java.time.LocalDate;
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
    @Query(value = "INSERT INTO reader(last_name, first_name, patronymic," +
                                      "birth_date, home_city, home_street" +
                                      "home_building_number, home_flat_number" +
                                      "work_place, principal_id)" +
                   "VALUES(:target_last_name, :target_first_name, :target_patronymic, :target_birth_date, :target_home_city," +
                          ":target_home_street, :target_home_building_number, :target_home_flat_number, :target_work_place," +
                          ":target_principal_id)",
            nativeQuery = true)
    void addReader(@Param("target_last_name") String lastName,
                   @Param("target_first_name") String firstName,
                   @Param("target_patronymic") String patronymic,
                   @Param("target_birth_date") LocalDate birthDate,
                   @Param("target_home_city") String homeCity,
                   @Param("target_home_street") String homeStreet,
                   @Param("target_home_building_number") String homeBuildingNumber,
                   @Param("target_home_flat_number") Integer homeFlatNumber,
                   @Param("target_workPlace") String workPlace,
                   @Param("target_principalId") Integer principalId);

    @Query(value = "SELECT ticket_number FROM reader " +
                   "WHERE principal_id = :target_principal_id",
            nativeQuery = true)
    Optional<Integer> findReaderByPrincipalId(@Param("target_principal_id") Integer principalId);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "DELETE FROM reader " +
            "WHERE ticket_number = :target_ticket_number " +
            "AND NOT EXISTS (SELECT * FROM checkout_history " +
                            "WHERE checkout_real_finish_date IS NOT NULL " +
                            "AND reader_ticket_number = :target_ticket_number)",
            nativeQuery = true)
    void deleteReader(@Param("target_ticket_number") Integer ticketNumber);
}