package ua.edu.ukma.LibraryManager.repositories;

import org.springframework.data.repository.CrudRepository;
import ua.edu.ukma.LibraryManager.models.domain.Role;

public interface RoleRepository extends CrudRepository<Role, Long> {
}