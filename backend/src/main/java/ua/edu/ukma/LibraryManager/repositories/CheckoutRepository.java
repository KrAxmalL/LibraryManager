package ua.edu.ukma.LibraryManager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.edu.ukma.LibraryManager.models.domain.Checkout;

public interface CheckoutRepository extends JpaRepository<Checkout, Integer> {
}