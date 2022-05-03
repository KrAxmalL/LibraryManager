package ua.edu.ukma.LibraryManager.services;

import ua.edu.ukma.LibraryManager.models.security.Principal;

import java.util.Optional;

public interface PrincipalService {

    Optional<Principal> getPrincipalById(Integer principalId);

    boolean deletePrincipal(Integer principalId);
}
