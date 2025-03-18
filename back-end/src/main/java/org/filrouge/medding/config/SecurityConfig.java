package org.filrouge.medding.config;

import lombok.RequiredArgsConstructor;
import org.filrouge.medding.utils.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final UserDetailsService userDetailsService;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        // Auth endpoints - public access
                        .requestMatchers("/api/auth/**").permitAll()

                        // Admin endpoints
                        .requestMatchers("/api/admin/**").hasAuthority("ROLE_ADMIN")

                        // Service Booking endpoints
                        .requestMatchers(HttpMethod.POST, "/api/services/*/book").hasAuthority("ROLE_ORGANIZER")
                        .requestMatchers("/api/services/bookings/wedding/**").hasAuthority("ROLE_ORGANIZER")
                        .requestMatchers("/api/services/bookings/vendor").hasAuthority("ROLE_VENDOR")

                        // Service endpoints
                        .requestMatchers(HttpMethod.POST, "/api/services/**").hasAuthority("ROLE_VENDOR")
                        .requestMatchers(HttpMethod.PUT, "/api/services/**").hasAuthority("ROLE_VENDOR")
                        .requestMatchers(HttpMethod.DELETE, "/api/services/**").hasAuthority("ROLE_VENDOR")
                        .requestMatchers(HttpMethod.GET, "/api/services/**").permitAll()

                        // Wedding endpoints
                        .requestMatchers(HttpMethod.POST, "/api/weddings/**").hasAuthority("ROLE_ORGANIZER")
                        .requestMatchers(HttpMethod.PUT, "/api/weddings/**").hasAuthority("ROLE_ORGANIZER")
                        .requestMatchers(HttpMethod.DELETE, "/api/weddings/**").hasAuthority("ROLE_ORGANIZER")
                        .requestMatchers(HttpMethod.GET, "/api/weddings/**").authenticated()

                        // Guest endpoints
                        .requestMatchers(HttpMethod.POST, "/api/guests/**").hasAuthority("ROLE_ORGANIZER")
                        .requestMatchers(HttpMethod.PUT, "/api/guests/**").hasAuthority("ROLE_ORGANIZER")
                        .requestMatchers(HttpMethod.DELETE, "/api/guests/**").hasAuthority("ROLE_ORGANIZER")
                        .requestMatchers("/api/guests/rsvp/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/guests/**").hasAuthority("ROLE_ORGANIZER")

                        // Profile endpoints
                        .requestMatchers("/api/profiles/vendors/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/profiles/**").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/profiles/**").authenticated()
                        .requestMatchers("/api/profiles/{id}/password").authenticated()

                        // Any other endpoint requires authentication
                        .anyRequest().authenticated()
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:4200"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
