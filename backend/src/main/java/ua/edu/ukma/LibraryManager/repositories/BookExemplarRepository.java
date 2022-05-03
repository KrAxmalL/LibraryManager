package ua.edu.ukma.LibraryManager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ua.edu.ukma.LibraryManager.models.domain.BookExemplar;

import java.util.Optional;

public interface BookExemplarRepository extends JpaRepository<BookExemplar, Integer> {

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "INSERT INTO book_exemplar(inventory_number, shelf, book_isbn) " +
                   "VALUES(:target_inventory_number, :target_shelf, :target_book_isbn)", nativeQuery = true)
    void addNewBookExemplar(@Param("target_book_isbn") String bookIsbn,
                            @Param("target_inventory_number")Integer inventoryNumber,
                            @Param("target_shelf") String shelf);

    @Query(value = "SELECT inventory_number FROM book_exemplar " +
                   "WHERE inventory_number = :target_inventory_number " +
                   "AND NOT EXISTS (SELECT exemplar_inventory_number FROM checkout_history " +
                                   "WHERE exemplar_inventory_number = :target_inventory_number " +
                                   "AND checkout_real_finish_date IS NULL)",
            nativeQuery = true)
    Optional<Integer> findExemplarAvailableForCheckout(@Param("target_inventory_number") Integer inventoryNumber);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "UPDATE book_exemplar SET shelf = :target_shelf " +
                   "WHERE inventory_number = :target_inventory_number",
            nativeQuery = true)
    void changeShelfForBookExemplar(@Param("target_inventory_number") Integer inventoryNumber,
                                       @Param("target_shelf") String shelf);
}