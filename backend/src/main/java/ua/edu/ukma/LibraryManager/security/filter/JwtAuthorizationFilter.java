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

import static java.util.Arrays.stream;

@Slf4j
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final JWTManager jwtManager;
    private final List<String> ignoredPaths;

    public JwtAuthorizationFilter(JWTManager jwtManager) {
        super();

        this.jwtManager = jwtManager;
        this.ignoredPaths = List.of("/api/login", "/api/token/refresh");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String path = request.getServletPath();
        if(ignoredPaths.contains(path)) {
            filterChain.doFilter(request, response);
        }
        else {
            String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
            if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                try {
                    String token = authorizationHeader.substring("Bearer ".length());
                    DecodedJWT decodedJWT = jwtManager.verifyToken(token);
                    String username = decodedJWT.getSubject();
                    String[] roles = decodedJWT.getClaim("roles").asArray(String.class);
                    Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
                    stream(roles).forEach(role -> authorities.add(new SimpleGrantedAuthority(role)));
                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(username, null, authorities);
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    log.info("Current path: {}", request.getServletPath());
                    log.info("authenticated!");
                    filterChain.doFilter(request, response);
                } catch(Exception ex) {
                    log.error("Error logging in: {}", ex.getMessage());
                    response.setStatus(HttpStatus.FORBIDDEN.value());
                    //response.sendError(HttpStatus.FORBIDDEN.value());
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
