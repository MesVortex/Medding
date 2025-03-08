package org.filrouge.medding.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.filrouge.medding.entities.Admin;
import org.filrouge.medding.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@RequiredArgsConstructor
@Order(1)
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private static final int MAX_RETRIES = 5;
    private static final long RETRY_DELAY = 5000; // 5 seconds

    @Override
    @Transactional
    public void run(String... args) {
        int retryCount = 0;
        boolean seeded = false;

        while (!seeded && retryCount < MAX_RETRIES) {
            try {
                seedAdminUser();
                seeded = true;
            } catch (Exception e) {
                retryCount++;
                log.error("Failed to seed database (attempt {}/{}): {}",
                        retryCount, MAX_RETRIES, e.getMessage());

                if (retryCount < MAX_RETRIES) {
                    try {
                        Thread.sleep(RETRY_DELAY);
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        break;
                    }
                }
            }
        }

        if (!seeded) {
            log.error("Failed to seed database after {} attempts", MAX_RETRIES);
        }
    }

    private void seedAdminUser() {
        String adminEmail = "admin@medding.com";

        if (!userRepository.existsByEmail(adminEmail)) {
            log.info("Seeding admin user...");
            Admin admin = new Admin();
            admin.setUsername("admin");
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode("admin123"));
            userRepository.save(admin);
            log.info("Admin user seeded successfully");
        } else {
            log.info("Admin user already exists, skipping seed");
        }
    }
}
