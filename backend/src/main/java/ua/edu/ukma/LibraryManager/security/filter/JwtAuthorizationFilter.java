package ua.edu.ukma.LibraryManager.security.filter;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import ua.edu.ukma.LibraryManager.security.jwt.JWTManager;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static java.util.Arrays.stream;

@Slf4j
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private static final List<String> ignoredPaths = List.of("/api/login", "/api/token/refresh");
    private static final String BEARER_STR = "Bearer ";
    private static final int BEARER_LENGTH = BEARER_STR.length();

    private final JWTManager jwtManager;

    public JwtAuthorizationFilter(JWTManager jwtManager) {
        super();
        this.jwtManager = jwtManager;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String path = request.getServletPath();
        if(ignoredPaths.contains(path)) {
            filterChain.doFilter(request, response);
        }
        else {
            String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
            if(authorizationHeader != null && authorizationHeader.startsWith(BEARER_STR)) {
                try {
                    String token = authorizationHeader.substring(BEARER_LENGTH);
                    String username = jwtManager.getEmail(token);
                    Collection<SimpleGrantedAuthority> authorities =
                            jwtManager.getRoles(token)
                                      .stream()
                                      .map(SimpleGrantedAuthority::new)
                                      .collect(Collectors.toList());

                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(username, null, authorities);
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    filterChain.doFilter(request, response);
                } catch(Exception ex) {
                    log.error("Error logging in: {}", ex.getMessage());
                    response.setStatus(HttpStatus.UNAUTHORIZED.value());
                    Map<String, String> errorMap = new HashMap<>();
                    errorMap.put("errorMessage", ex.getMessage());
                    response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                    new ObjectMapper().writeValue(response.getWriter(), errorMap);
                }
            }
            else {
                filterChain.doFilter(request, response);
            }
        }
    }
}
