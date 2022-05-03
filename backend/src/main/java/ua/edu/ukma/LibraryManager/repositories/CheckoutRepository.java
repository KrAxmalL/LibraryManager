package ua.edu.ukma.LibraryManager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ua.edu.ukma.LibraryManager.models.domain.Checkout;

import java.time.LocalDate;
import java.util.List;

public interface CheckoutRepository extends JpaRepository<Checkout, Integer> {


    @Query(value = "SELECT checkout_history.checkout_number, checkout_history.checkout_start_date," +
            " checkout_history.checkout_expected_finish_date, checkout_history.checkout_real_finish_date," +
            " book.isbn, book.title, book_exemplar.inventory_number" +
            " FROM checkout_history INNER JOIN book_exemplar" +
            "  ON checkout_history.exemplar_inventory_number = book_exemplar.inventory_number" +
            "  INNER JOIN book" +
            "  ON book.isbn = book_exemplar.book_isbn" +
            " WHERE reader_ticket_number IN" +
            "          (SELECT ticket_number " +
            "           FROM reader " +
            "           WHERE principal_id IN" +
            "               (SELECT principal_id" +
            "                FROM principal" +
            "                WHERE email = :searched_reader_email)" +
            "          );",
            nativeQuery = true)
    List<Object[]> findCheckoutsOfReader(@Param("searched_reader_email") String readerEmail);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "INSERT INTO checkout_history(checkout_start_date, checkout_expected_finish_date, checkout_real_finish_date, " +
                                                "exemplar_inventory_number, reader_ticket_number) " +
                   "VALUES(:target_start_date, :target_expected_finish_date, NULL, " +
                          ":target_exemplar_inventory_number, :target_reader_ticket_number)",
            nativeQuery = true)
    void addNewCheckout(@Param("target_start_date") LocalDate startDate,
                        @Param("target_expected_finish_date") LocalDate finishDate,
                        @Param("target_exemplar_inventory_number") Integer inventoryNumber,
                        @Param("target_reader_ticket_number") Integer ticketNumber);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "UPDATE checkout_history SET checkout_real_finish_date = :target_real_finish_date " +
                   "WHERE checkout_number = :target_checkout_number",
            nativeQuery = true)
    void setRealFinishDateForCheckout(@Param("target_checkout_number") Integer checkoutNumber,
                                      @Param("target_real_finish_date") LocalDate realFinishDate);
}