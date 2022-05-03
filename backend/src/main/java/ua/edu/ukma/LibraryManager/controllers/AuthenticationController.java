package ua.edu.ukma.LibraryManager.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.edu.ukma.LibraryManager.models.dto.jwt.JwtToken;
import ua.edu.ukma.LibraryManager.models.dto.principal.LoginPrincipalDTO;
import ua.edu.ukma.LibraryManager.models.security.Principal;
import ua.edu.ukma.LibraryManager.security.jwt.JWTManager;
import ua.edu.ukma.LibraryManager.services.PrincipalService;
import ua.edu.ukma.LibraryManager.services.SubjectAreaService;

import java.util.Optional;

@RestController
@RequestMapping("/api/authentication")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final JWTManager jwtManager;

    @PostMapping("/login")
    public ResponseEntity<JwtToken> login(@RequestBody LoginPrincipalDTO principalToLogin) {
        try {
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(principalToLogin.getEmail(), principalToLogin.getPassword());
            Principal principal = (Principal) authenticationManager.authenticate(authenticationToken).getPrincipal();

            String accessToken = jwtManager.getAccessToken(principal);
            return ResponseEntity.ok(new JwtToken(accessToken));
        } catch(AuthenticationException ex) {
            return ResponseEntity.badRequest().build();
        }
    }
}
