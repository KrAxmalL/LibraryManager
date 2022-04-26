package ua.edu.ukma.LibraryManager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ua.edu.ukma.LibraryManager.models.Book;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, String> {

    @Query(value  = "SELECT * FROM book WHERE isbn IN " +
            "(SELECT book_isbn FROM book_subject_area WHERE subject_area_cipher = :cipher)",
            nativeQuery = true)
    List<Book> findBooksBySubjectArea(@Param("cipher") String subjectAreaCipher);

    @Query(value  = "SELECT * FROM book WHERE isbn IN " +
            "(SELECT book_isbn FROM book_author WHERE asuthor = :author)",
            nativeQuery = true)
    List<Book> findBooksByAuthor(@Param("author") String author);
}