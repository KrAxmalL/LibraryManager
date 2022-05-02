package ua.edu.ukma.LibraryManager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ua.edu.ukma.LibraryManager.models.domain.BookExemplar;

public interface BookExemplarRepository extends JpaRepository<BookExemplar, Integer> {

    @Modifying
    @Query(value = "INSERT INTO book_exemplar(inventory_number, shelf, book_isbn) " +
                   "VALUES(:target_inventory_number, :target_shelf, :target_book_isbn)", nativeQuery = true)
    void addNewBookExemplar(@Param("target_book_isbn") String bookIsbn,
                            @Param("target_inventory_number")Integer inventoryNumber,
                            @Param("target_shelf") String shelf);
}