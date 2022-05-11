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
import ua.edu.ukma.LibraryManager.models.dto.principal.AddReaderDTO;
import ua.edu.ukma.LibraryManager.models.dto.principal.RegisterReaderDTO;
import ua.edu.ukma.LibraryManager.models.security.Principal;
import ua.edu.ukma.LibraryManager.repositories.PrincipalRepository;
import ua.edu.ukma.LibraryManager.utils.StringUtils;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class PrincipalServiceImpl implements PrincipalService, UserDetailsService {

    private static final String ROLE_READER = "READER";

    private final PrincipalRepository principalRepository;
    private final PasswordEncoder passwordEncoder;
    private final ReaderService readerService;

    @Override
    public Optional<Principal> getPrincipalById(Integer principalId) {
        return principalRepository.findById(principalId);
    }

    @Override
    public Optional<Principal> registerReader(RegisterReaderDTO readerToRegister) {
        //todo: refactor validation
        String email = readerToRegister.getEmail();
        String password = readerToRegister.getPassword();
        String lastName = readerToRegister.getLastName();
        String firstName = readerToRegister.getFirstName();
        String patronymic = readerToRegister.getPatronymic();
        LocalDate birthDate = readerToRegister.getBirthDate();
        //todo: add regexp for phone number validation
        List<String> phoneNumbers = readerToRegister.getPhoneNumbers();
        String homeCity = readerToRegister.getHomeCity();
        String homeStreet = readerToRegister.getHomeStreet();
        String homeBuildingNumber = readerToRegister.getHomeBuildingNumber();
        Integer homeFlatNumber = readerToRegister.getHomeFlatNumber();
        String workPlace = readerToRegister.getWorkPlace();
        if(StringUtils.isNotNullOrBlank(email)
                && StringUtils.isNotNullOrBlank(password)
                && StringUtils.isNotNullOrBlank(lastName)
                && StringUtils.isNotNullOrBlank(firstName)
                && StringUtils.isNotNullOrBlank(patronymic)
                && StringUtils.isNotNullOrBlank(homeCity)
                && StringUtils.isNotNullOrBlank(homeStreet)
                && StringUtils.isNotNullOrBlank(homeBuildingNumber)
                && birthDate != null
                && !phoneNumbers.isEmpty() && phoneNumbers.size() <= 3
                && (homeFlatNumber == null || homeFlatNumber > 0)
                && StringUtils.isNotNullOrBlank(workPlace)
                && principalRepository.findPrincipalByEmail(email).isEmpty()
        ) {
            principalRepository.addPrincipal(email, passwordEncoder.encode(password));
            Optional<Principal> registeredPrincipalOpt = principalRepository.findPrincipalByEmail(email);
            if(registeredPrincipalOpt.isPresent()) {
                Principal addedPrincipal = registeredPrincipalOpt.get();
                Optional<Integer> roleIdOpt = principalRepository.findRoleByName(ROLE_READER);
                if(roleIdOpt.isPresent()) {
                    Integer principalId = addedPrincipal.getId();
                    Integer roleId = roleIdOpt.get();
                    principalRepository.addRoleForPrincipal(principalId, roleId);

                    AddReaderDTO readerToAdd = new AddReaderDTO();
                    readerToAdd.setLastName(lastName.trim());
                    readerToAdd.setFirstName(firstName.trim());
                    readerToAdd.setPatronymic(patronymic.trim());
                    readerToAdd.setPhoneNumbers(phoneNumbers);
                    readerToAdd.setBirthDate(birthDate);
                    readerToAdd.setHomeCity(homeCity.trim());
                    readerToAdd.setHomeStreet(homeStreet.trim());
                    readerToAdd.setHomeBuildingNumber(homeBuildingNumber.trim());
                    readerToAdd.setHomeFlatNumber(homeFlatNumber);
                    readerToAdd.setWorkPlace(workPlace.trim());

                    boolean addedReader = readerService.addReader(readerToAdd, principalId);
                    if(addedReader) {
                        return registeredPrincipalOpt;
                    }
                }
            }
        }
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
