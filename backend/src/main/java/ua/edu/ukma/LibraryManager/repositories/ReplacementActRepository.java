package ua.edu.ukma.LibraryManager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ua.edu.ukma.LibraryManager.models.domain.ReplacementAct;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ReplacementActRepository extends JpaRepository<ReplacementAct, Integer> {

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "INSERT INTO replacement_act(replacement_date, replaced_exemplar_number, new_exemplar_number)" +
            "VALUES(:target_replacement_date, :target_replaced_exemplar_number, :target_new_exemplar_number) ",
            nativeQuery = true)
    void addReplacementAct(@Param("target_replacement_date") LocalDate replacementDate,
                           @Param("target_replaced_exemplar_number") Integer replacedExemplarNumber,
                           @Param("target_new_exemplar_number") Integer newExemplarNumber);

    @Query(value = "SELECT act_number FROM replacement_act " +
            "WHERE replaced_exemplar_number = :target_replaced_exemplar_number",
            nativeQuery = true)
    Optional<Integer> findReplacementActForExemplar(@Param("target_replaced_exemplar_number") Integer replacedExemplarNumber);

    @Query(value = "SELECT book.isbn, book.title, replacement_act.act_number, " +
                          "replacement_act.replaced_exemplar_number, replacement_act.new_exemplar_number, " +
                          "replacement_act.replacement_date, book.price " +
                   "FROM replacement_act INNER JOIN book_exemplar " +
                         "ON replacement_act.replaced_exemplar_number = book_exemplar.inventory_number " +
                   "INNER JOIN book " +
                         "ON book.isbn = book_exemplar.book_isbn",
            nativeQuery = true)
    List<Object[]> findReplacementActsDetails();
}