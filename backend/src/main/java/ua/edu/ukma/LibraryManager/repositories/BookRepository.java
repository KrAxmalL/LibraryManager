package ua.edu.ukma.LibraryManager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ua.edu.ukma.LibraryManager.models.domain.Book;
import ua.edu.ukma.LibraryManager.models.domain.BookExemplar;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, String> {

    @Query(value  = "SELECT * FROM book WHERE title LIKE %:title%",
            nativeQuery = true)
    List<Book> findBooksByTitle(@Param("title") String title);

    @Query(value  = "SELECT * FROM book WHERE isbn IN " +
            "(SELECT book_isbn FROM book_subject_area WHERE subject_area_cipher = :cipher)",
            nativeQuery = true)
    List<Book> findBooksBySubjectArea(@Param("cipher") String subjectAreaCipher);

    @Query(value  = "SELECT * FROM book WHERE isbn IN " +
            "(SELECT book_isbn FROM book_author WHERE author_name = :author)",
            nativeQuery = true)
    List<Book> findBooksByAuthor(@Param("author") String author);


    @Query(value  = "SELECT * FROM book WHERE title LIKE %:title%" +
            " AND isbn IN (SELECT book_isbn FROM book_author WHERE author_name IN :authors)",
            nativeQuery = true)
    List<Book> findBooksByAuthorsAndTitle(@Param("title") String title,
                                          @Param("authors") List<String> authors);

    @Query(value  = "SELECT * FROM book WHERE title LIKE %:title%" +
            " AND isbn IN (SELECT book_isbn FROM book_subject_area WHERE subject_area_cipher IN :areas)",
            nativeQuery = true)
    List<Book> findBooksByAreasAndTitle(@Param("title") String title,
                                        @Param("areas") List<String> areasIds);

    @Query(value  = "SELECT * FROM book WHERE title LIKE %:title%" +
            " AND isbn IN (SELECT book_isbn FROM book_subject_area WHERE subject_area_cipher IN :areas)" +
            " AND isbn IN (SELECT book_isbn FROM book_author WHERE author_name IN :authors)",
            nativeQuery = true)
    List<Book> findBooksByAreasAndAuthorsAndTitle(@Param("title") String title,
                                                  @Param("areas") List<String> areasIds,
                                                  @Param("authors") List<String> authors);

    @Query(value  = "SELECT * FROM book_exemplar WHERE book_isbn = :searched_book_isbn",
            nativeQuery = true)
    List<BookExemplar> findBookExemplars(@Param("searched_book_isbn") String bookIsbn);

    @Query(value  = "SELECT * FROM book_exemplar" +
            " WHERE NOT EXISTS (SELECT * FROM checkout_history" +
            "                   WHERE book_exemplar.inventory_number = checkout_history.exemplar_inventory_number" +
            "                   AND checkout_real_finish_date IS NULL)" +
            " AND book_isbn = :searched_book_isbn",
            nativeQuery = true)
    List<Object[]> findAvailableBookExemplars(@Param("searched_book_isbn") String bookIsbn);

    @Query(value  = "SELECT checkout_expected_finish_date FROM checkout_history" +
            " WHERE checkout_real_finish_date IS NULL" +
            " AND exemplar_inventory_number IN (SELECT inventory_number" +
            "                                   FROM book_exemplar" +
            "                                   WHERE book_isbn = :searched_book_isbn)" +
            " ORDER BY checkout_expected_finish_date ASC LIMIT 1",
            nativeQuery = true)
    Optional<LocalDate> findClosestExemplarAvailableDate(@Param("searched_book_isbn") String bookIsbn);

    @Query(value  = "SELECT DISTINCT author_name FROM book_author",
            nativeQuery = true)
    List<String> findAllAuthors();

    @Query(value  = "SELECT author_name FROM book_author " +
                    "WHERE book_isbn = :target_book_isbn",
            nativeQuery = true)
    List<String> findAuthorsOfBook(@Param("target_book_isbn") String bookIsbn);

    @Query(value  = "SELECT subject_area_cipher FROM book_subject_area " +
            "WHERE book_isbn = :target_book_isbn",
            nativeQuery = true)
    List<String> findAreasOfBook(@Param("target_book_isbn") String bookIsbn);

    @Query(value  = "SELECT book_isbn FROM book_author " +
            "WHERE book_isbn = :target_book_isbn AND author_name = :target_author_name",
            nativeQuery = true)
    Optional<String> findBookByIsbnAndAuthor(@Param("target_book_isbn") String bookIsbn,
                                             @Param("target_author_name") String authorName);

    @Query(value  = "SELECT book_isbn FROM book_subject_area " +
            "WHERE book_isbn = :target_book_isbn AND subject_area_cipher = :target_area_cipher",
            nativeQuery = true)
    Optional<String> findBookByIsbnAndArea(@Param("target_book_isbn") String bookIsbn,
                                             @Param("target_area_cipher") String areaCipher);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "INSERT INTO book(isbn, title, publishing_city, publisher, publishing_year, page_number, price) " +
                   "VALUES(:target_isbn, :target_title, :target_publishing_city, :target_publisher, " +
                          ":target_publishing_year, :target_page_number, :target_price)",
            nativeQuery = true)
    void addBook(@Param("target_isbn") String isbn,
                 @Param("target_title") String title,
                 @Param("target_publishing_city") String publishingCity,
                 @Param("target_publisher") String publisher,
                 @Param("target_publishing_year") Integer publishingYear,
                 @Param("target_page_number") Integer pageNumber,
                 @Param("target_price") BigDecimal price);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value  = "INSERT INTO book_subject_area(book_isbn, subject_area_cipher) " +
            "VALUES(:target_book_isbn, :target_subject_area_cipher)",
            nativeQuery = true)
    void addAreaForBook(@Param("target_book_isbn") String bookIsbn,
                        @Param("target_subject_area_cipher") String areaCipher);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value  = "DELETE FROM book_subject_area " +
            "WHERE book_isbn = :target_book_isbn",
            nativeQuery = true)
    void deleteAreasForBook(@Param("target_book_isbn") String bookIsbn);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value  = "INSERT INTO book_author(book_isbn, author_name) " +
                    "VALUES(:target_book_isbn, :target_author_name)",
            nativeQuery = true)
    void addAuthorForBook(@Param("target_book_isbn") String bookIsbn,
                          @Param("target_author_name") String authorName);

    @Query(value  = "SELECT checkout_number FROM checkout_history " +
                    "WHERE checkout_real_finish_date IS NOT NULL " +
                          "AND exemplar_inventory_number IN " +
                              "(SELECT inventory_number " +
                               "FROM book_exemplar " +
                               "WHERE book_isbn = :target_book_isbn)",
            nativeQuery = true)
    List<Integer> getActiveCheckoutOfBook(@Param("target_book_isbn") String bookIsbn);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "DELETE FROM book " +
                   "WHERE isbn = :target_book_isbn " +
                          "AND NOT EXISTS (SELECT * FROM checkout_history " +
                                          "WHERE checkout_real_finish_date IS NOT NULL " +
                                          "AND exemplar_inventory_number IN (SELECT inventory_number " +
                                                                            "FROM book_exemplar " +
                                                                            "WHERE book_isbn = :target_book_isbn)" +
                                         ")",
            nativeQuery = true)
    void deleteBook(@Param("target_book_isbn") String bookIsbn);
}