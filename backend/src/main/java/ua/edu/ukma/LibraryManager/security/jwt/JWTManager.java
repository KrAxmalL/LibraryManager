package ua.edu.ukma.LibraryManager.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import ua.edu.ukma.LibraryManager.models.security.Principal;

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JWTManager {

    private static final long ACCESS_TOKEN_EXPIRATION_TIME_MILLIS = 60 * 60 * 1000;
    private static final String CLAIM_ROLES = "roles";
    private static final String ISSUER = "LibraryManagerApplication";

    private final Algorithm algorithm;
    private final JWTVerifier verifier;

    public JWTManager() {
        //todo: move secret to properties
        this.algorithm = Algorithm.HMAC256("secret".getBytes(StandardCharsets.UTF_8));
        this.verifier = JWT.require(algorithm).build();
    }

    public String getAccessToken(Principal principal) {
        return JWT.create()
                  .withSubject(principal.getUsername())
                  .withExpiresAt(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION_TIME_MILLIS))
                  .withIssuer(ISSUER)
                  .withClaim(CLAIM_ROLES, principal.getAuthorities().stream()
                                                                    .map(GrantedAuthority::getAuthority)
                                                                    .collect(Collectors.toList()))
                  .sign(algorithm);
    }

    public DecodedJWT verifyToken(String token) {
        return verifier.verify(token);
    }

    public String getEmail(String token) {
        return verifyToken(token).getSubject();
    }

    public List<String> getRoles(String token) {
        return verifyToken(token).getClaim(CLAIM_ROLES).asList(String.class);
    }

    public boolean isTokenExpired(String token) {
        final Date now = new Date();
        return verifyToken(token).getExpiresAt().after(now);
    }
}
