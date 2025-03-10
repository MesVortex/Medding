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
    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::userToUserResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public DashboardStatsDTO getDashboardStats() {
        DashboardStatsDTO stats = new DashboardStatsDTO();

        // Count total users by role
        stats.setTotalUsers(userRepository.count());
        stats.setTotalVendors(vendorRepository.count());
        stats.setPendingVendors(vendorRepository.countByVerifiedFalse());
        stats.setVerifiedVendors(vendorRepository.countByVerifiedTrue());
        stats.setTotalOrganizers(userRepository.countByRole(UserRole.ORGANIZER));

        // Convert List<Object[]> to Map<String, Long>
        Map<String, Long> usersByRole = userRepository.countByRoleGrouped().stream()
                .collect(Collectors.toMap(
                        arr -> ((UserRole) arr[0]).name(),
                        arr -> (Long) arr[1]
                ));
        stats.setUsersByRole(usersByRole);

        // Get vendors distribution by location
        Map<String, Long> vendorsByLocation = vendorRepository.countByLocationGrouped();
        stats.setVendorsByLocation(vendorsByLocation);

        return stats;
    }
}
