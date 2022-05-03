package ua.edu.ukma.LibraryManager.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.edu.ukma.LibraryManager.models.dto.principal.RegisterReaderDTO;
import ua.edu.ukma.LibraryManager.models.security.Principal;
import ua.edu.ukma.LibraryManager.repositories.PrincipalRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class PrincipalServiceImpl implements PrincipalService, UserDetailsService {

    private final PrincipalRepository principalRepository;
    private final PasswordEncoder passwordEncoder;
    private ReaderService readerService;

    @Override
    public Optional<Principal> getPrincipalById(Integer principalId) {
        return principalRepository.findById(principalId);
    }

    @Override
    public Optional<Principal> registerReader(RegisterReaderDTO readerToRegister) {
        return Optional.empty();
    }

    @Override
    public boolean deleteReader(Integer ticketNumber) {
        Optional<Integer> principalIdOpt = readerService.getIdOfPrincipal(ticketNumber);
        if(principalIdOpt.isPresent()) {
            Integer principalId = principalIdOpt.get();
            boolean deletedReader = readerService.deleteReader(ticketNumber);
            if(deletedReader) {
                principalRepository.deletePrincipal(principalId);
                return !principalRepository.existsById(principalId);
            }
        }

        return false;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Principal> principalOpt = principalRepository.findPrincipalByEmail(username);
        if(principalOpt.isEmpty()) {
            throw new UsernameNotFoundException("Principal not found in the database");
        }

        final Principal principal = principalOpt.get();
        log.info("Loading user by username: {} {}", principal.getUsername(), principal.getPassword());
        return principal;
    }

    @Override
    public boolean deletePrincipal(Integer principalId) {
        if(principalId != null && principalRepository.existsById(principalId)) {
            principalRepository.deletePrincipal(principalId);
            return !principalRepository.existsById(principalId);
        }

        return false;
    }
}
