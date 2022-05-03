package ua.edu.ukma.LibraryManager.security.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import ua.edu.ukma.LibraryManager.models.security.Principal;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class JWTManager {

    private static final long ACCESS_TOKEN_EXPIRATION_TIME_MILLIS = 10 * 60 * 1000;
    private static final String CLAIM = "roles";
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
                  .withClaim(CLAIM, principal.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                  .sign(algorithm);
    }

    public DecodedJWT verifyToken(String token) {
        return verifier.verify(token);
    }
}
