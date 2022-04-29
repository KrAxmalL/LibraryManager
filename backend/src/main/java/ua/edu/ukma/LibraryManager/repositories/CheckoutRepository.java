package ua.edu.ukma.LibraryManager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ua.edu.ukma.LibraryManager.models.domain.Checkout;

import java.util.List;

public interface CheckoutRepository extends JpaRepository<Checkout, Integer> {


    @Query(value = "",
            nativeQuery = true)
    List<Object[]> findCheckoutsOfReader(String readerEmail);
}