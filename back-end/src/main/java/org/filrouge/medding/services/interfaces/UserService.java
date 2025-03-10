package org.filrouge.medding.services.interfaces;

import org.filrouge.medding.dto.responses.DashboardStatsDTO;
import org.filrouge.medding.dto.responses.UserResponseDTO;

import java.util.List;

public interface UserService {
    List<UserResponseDTO> getAllUsers();
    DashboardStatsDTO getDashboardStats();
}
