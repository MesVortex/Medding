package org.filrouge.medding.utils;

import lombok.RequiredArgsConstructor;
import org.filrouge.medding.entities.User;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SecurityUtils {
    private final JwtUtil jwtUtil;

    public Long getCurrentUserId() {
        User currentUser = jwtUtil.getCurrentUser();
        if (currentUser != null) {
            return currentUser.getId();
        }
        throw new RuntimeException("No authenticated user found");
    }
}
