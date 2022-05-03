package ua.edu.ukma.LibraryManager.services;

import ua.edu.ukma.LibraryManager.models.dto.principal.RegisterReaderDTO;
import ua.edu.ukma.LibraryManager.models.security.Principal;

import java.util.Optional;

public interface PrincipalService {

    Optional<Principal> getPrincipalById(Integer principalId);

    Optional<Principal> registerReader(RegisterReaderDTO readerToRegister);

    boolean deleteReader(Integer ticketNumber);

    boolean deletePrincipal(Integer principalId);
}
