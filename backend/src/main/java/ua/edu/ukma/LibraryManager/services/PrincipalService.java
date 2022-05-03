package ua.edu.ukma.LibraryManager.services;

import ua.edu.ukma.LibraryManager.models.domain.Principal;

import java.util.Optional;

public interface PrincipalService {

    Optional<Principal> getPrincipalById(Long principalId);

    boolean deletePrincipal(Long principalId);
}
