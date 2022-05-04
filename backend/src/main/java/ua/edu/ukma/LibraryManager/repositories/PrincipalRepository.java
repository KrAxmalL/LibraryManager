package ua.edu.ukma.LibraryManager.repositories;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import ua.edu.ukma.LibraryManager.models.security.Principal;

import java.util.Optional;

public interface PrincipalRepository extends CrudRepository<Principal, Integer> {

    @Query(value = "SELECT * FROM principal " +
                   "WHERE email = :target_email",
            nativeQuery = true)
    Optional<Principal> findPrincipalByEmail(@Param("target_email") String email);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "INSERT INTO principal(email, password) " +
                   "VALUES(:target_email, :target_password)",
            nativeQuery = true)
    void addPrincipal(@Param("target_email") String email,
                      @Param("target_password") String password);

    @Query(value = "SELECT role_id FROM role " +
                   "WHERE role_name = :target_role_name",
            nativeQuery = true)
    Optional<Integer> findRoleByName(@Param("target_role_name") String roleName);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "INSERT INTO principal_role(principal_id, role_id) " +
            "VALUES(:target_principal_id, :target_role_id)",
            nativeQuery = true)
    void addRoleForPrincipal(@Param("target_principal_id") Integer principalId,
                             @Param("target_role_id") Integer roleId);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "DELETE FROM principal " +
                   "WHERE principal_id = :target_principal_id ",
            nativeQuery = true)
    void deletePrincipal(@Param("target_principal_id") Integer principalId);
}