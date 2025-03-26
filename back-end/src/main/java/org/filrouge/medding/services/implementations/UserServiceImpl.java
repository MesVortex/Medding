package org.filrouge.medding.services.implementations;

import lombok.RequiredArgsConstructor;
import org.filrouge.medding.dto.responses.DashboardStatsDTO;
import org.filrouge.medding.dto.responses.UserResponseDTO;
import org.filrouge.medding.entities.enums.UserRole;
import org.filrouge.medding.mappers.UserMapper;
import org.filrouge.medding.repositories.UserRepository;
import org.filrouge.medding.repositories.VendorRepository;
import org.filrouge.medding.services.interfaces.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final VendorRepository vendorRepository;
    private final UserMapper userMapper;

    @Override
    public DashboardStatsDTO getDashboardStats() {
        DashboardStatsDTO stats = new DashboardStatsDTO();

        // Get total counts
        stats.setTotalUsers(userRepository.count());
        stats.setTotalVendors(userRepository.countByRole(UserRole.VENDOR));
        stats.setTotalOrganizers(userRepository.countByRole(UserRole.ORGANIZER));
        stats.setPendingVendors(vendorRepository.countByVerifiedFalse());
        stats.setVerifiedVendors(vendorRepository.countByVerifiedTrue());

        // Convert the grouped results to a Map for users by role
        Map<String, Long> usersByRole = userRepository.countByRoleGrouped()
                .stream()
                .collect(Collectors.toMap(
                        row -> ((UserRole) row[0]).name(),
                        row -> ((Number) row[1]).longValue()
                ));
        stats.setUsersByRole(usersByRole);

        // Convert the grouped results to a Map for vendors by location
        Map<String, Long> vendorsByLocation = vendorRepository.countByLocationGrouped()
                .stream()
                .collect(Collectors.toMap(
                        row -> (String) row[0],
                        row -> ((Number) row[1]).longValue()
                ));
        stats.setVendorsByLocation(vendorsByLocation);

        return stats;
    }

    @Override
    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::userToUserResponseDTO)
                .collect(Collectors.toList());
    }
}
