package ua.edu.ukma.LibraryManager.repositories;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import ua.edu.ukma.LibraryManager.models.domain.Principal;

import java.util.Optional;

public interface PrincipalRepository extends CrudRepository<Principal, Integer> {

    @Query(value = "SELECT * FROM principal " +
                   "WHERE email = :target_email",
            nativeQuery = true)
    Optional<Principal> findPrincipalByEmail(@Param("target_email") String email);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "DELETE FROM principal " +
                   "WHERE principal_id = :target_principal_id ",
            nativeQuery = true)
    void deletePrincipal(@Param("target_principal_id") Integer principalId);
}