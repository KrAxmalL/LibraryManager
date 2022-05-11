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

    @Query(value = "SELECT ticket_number, last_name, first_name, patronymic " +
            "FROM reader " +
            "WHERE ticket_number IN " +
            "(SELECT reader_ticket_number " +
            "FROM checkout_history " +
            "WHERE checkout_real_finish_date IS NOT NULL " +
            "AND exemplar_inventory_number IN " +
            "(SELECT inventory_number " +
            "FROM book_exemplar " +
            "WHERE book_isbn = :target_book_isbn)" +
            ")",
            nativeQuery = true)
    List<Object[]> findReadersWhoReadBook(@Param("target_book_isbn") String bookIsbn);

    @Query(value = "SELECT reader.ticket_number, reader.last_name, reader.first_name, reader.patronymic, " +
                          "COUNT(DISTINCT book.isbn) AS read_books " +
                   "FROM reader LEFT JOIN checkout_history  " +
                    "ON reader.ticket_number = checkout_history.reader_ticket_number " +
                   "LEFT JOIN book_exemplar " +
                    "ON book_exemplar.inventory_number = checkout_history.exemplar_inventory_number " +
                   "LEFT JOIN book " +
                    "ON book_exemplar.book_isbn = book.isbn " +
                   "GROUP BY reader.ticket_number",
            nativeQuery = true)
    List<Object[]> findNumberOfReadBooksForAllReaders();

    @Query(value = "SELECT reader.ticket_number, reader.last_name, reader.first_name, reader.patronymic, " +
            "              COUNT(checkout_history.checkout_number) AS debt_books " +
            "FROM reader INNER JOIN checkout_history  " +
            "ON reader.ticket_number = checkout_history.reader_ticket_number " +
            "WHERE CURRENT_DATE > checkout_history.checkout_expected_finish_date " +
                   "AND checkout_real_finish_date IS NULL " +
            "GROUP BY reader.ticket_number",
            nativeQuery = true)
    List<Object[]> findOwerReaders();

    @Query(value = "SELECT ticket_number, last_name, first_name, patronymic " +
                   "FROM reader " +
                   "WHERE NOT EXISTS " +
                       "(SELECT * " +
                        "FROM book " +
                        "WHERE NOT EXISTS " +
                                "(SELECT * " +
                                 "FROM checkout_history " +
                                 "WHERE checkout_real_finish_date IS NOT NULL " +
                                       "AND checkout_history.reader_ticket_number =  reader.ticket_number " +
                                       "AND checkout_history.exemplar_inventory_number IN " +
                                               "(SELECT inventory_number " +
                                                "FROM book_exemplar " +
                                                "WHERE book_exemplar.book_isbn = book.isbn) " +
                                ") " +
                        "AND isbn IN " +
                                "(SELECT book_isbn " +
                                 "FROM book_subject_area " +
                                 "WHERE subject_area_cipher = :target_area_cipher) " +
                       ")",
            nativeQuery = true)
    List<Object[]> findReadersWhoReadAllBooksFromArea(@Param("target_area_cipher") String areaCipher);

    @Query(value = "SELECT ticket_number, last_name, first_name, patronymic " +
                   "FROM reader " +
                   "WHERE ticket_number IN " +
                           "(SELECT reader_ticket_number " +
                            "FROM checkout_history " +
                            "WHERE exemplar_inventory_number IN " +
                                    "(SELECT inventory_number " +
                                     "FROM book_exemplar " +
                                     "WHERE book_isbn IN " +
                                            "(SELECT isbn " +
                                             "FROM book " +
                                             "WHERE isbn IN " +
                                                  "(SELECT book_isbn " +
                                                   "FROM book_subject_area " +
                                                   "WHERE subject_area_cipher = :target_area_cipher)" +
                                            ")" +
                                    ")" +
                            "AND checkout_real_finish_date IS NOT NULL " +
                            "GROUP BY reader_ticket_number " +
                            "HAVING COUNT(DISTINCT exemplar_inventory_number) > 0" +
                           ")",
            nativeQuery = true)
    List<Object[]> findReadersWhoReadAtLeastOneBooksFromArea(@Param("target_area_cipher") String areaCipher);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "INSERT INTO reader(last_name, first_name, patronymic," +
                                      "birth_date, home_city, home_street," +
                                      "home_building_number, home_flat_number," +
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
                   @Param("target_work_place") String workPlace,
                   @Param("target_principal_id") Integer principalId);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "INSERT INTO reader_phone(phone_number, reader_ticket_number) " +
                   "VALUES(:target_phone_number, :target_ticket_number)",
            nativeQuery = true)
    void addPhoneForReader(@Param("target_phone_number") String phoneNumber,
                           @Param("target_ticket_number") Integer ticketNumber);

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