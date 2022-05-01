package ua.edu.ukma.LibraryManager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ua.edu.ukma.LibraryManager.models.domain.Checkout;

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
}