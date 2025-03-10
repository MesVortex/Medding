package org.filrouge.medding.repositories;

import org.filrouge.medding.entities.User;
import org.filrouge.medding.entities.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);
    long countByRole(UserRole role);

    @Query("SELECT u.role as role, COUNT(u) as count FROM User u GROUP BY u.role")
    List<Object[]> countByRoleGrouped();
}
