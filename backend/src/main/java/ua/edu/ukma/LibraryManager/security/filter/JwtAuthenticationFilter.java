package ua.edu.ukma.LibraryManager.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import ua.edu.ukma.LibraryManager.models.security.Principal;
import ua.edu.ukma.LibraryManager.security.jwt.JWTManager;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JWTManager jwtManager;

    private final ObjectMapper mapper;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JWTManager jwtManager) {
        this.authenticationManager = authenticationManager;
        this.jwtManager = jwtManager;

        mapper = new ObjectMapper();
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
       try {
           final ObjectNode body = mapper.readValue(request.getReader(), ObjectNode.class);
           final String email = body.get("email").asText();
           final String password = body.get("password").asText();

           log.info("Email is: {}", email);
           log.info("Password is: {}", password);

           UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);
           return authenticationManager.authenticate(authenticationToken);
       } catch (IOException e) {
           //todo: add proper handling
           e.printStackTrace();
           return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken("", ""));
       }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException {
        Principal user = (Principal) authResult.getPrincipal();
        String issuer = request.getRequestURL().toString();
        log.info("Password in successfull auth: {}", user.getPassword());
        user.getAuthorities().forEach(role -> log.info("Roles: {}", role.toString()));

        String accessToken = jwtManager.getAccessToken(user, issuer);

        Map<String, String> tokensMap = new HashMap<>();
        tokensMap.put("accessToken", accessToken);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getWriter(), tokensMap);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        log.info("Authentication failed!!!");
        log.info(failed.getMessage());
        super.unsuccessfulAuthentication(request, response, failed);
    }
}