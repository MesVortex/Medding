package org.filrouge.medding.services.implementations;

import lombok.RequiredArgsConstructor;
import org.filrouge.medding.dto.requests.OrganizerRequestDTO;
import org.filrouge.medding.dto.requests.UserRequestDTO;
import org.filrouge.medding.dto.requests.VendorRequestDTO;
import org.filrouge.medding.dto.responses.LoginResponseDTO;
import org.filrouge.medding.dto.responses.UserResponseDTO;
import org.filrouge.medding.entities.Organizer;
import org.filrouge.medding.entities.User;
import org.filrouge.medding.entities.Vendor;
import org.filrouge.medding.exceptions.UserAlreadyExistsException;
import org.filrouge.medding.exceptions.UserNotFoundException;
import org.filrouge.medding.mappers.UserMapper;
import org.filrouge.medding.repositories.UserRepository;
import org.filrouge.medding.services.CustomUserDetailsService;
import org.filrouge.medding.services.interfaces.AuthService;
import org.filrouge.medding.utils.JwtUtil;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;
    private final CustomUserDetailsService customUserDetailsService;

    @Override
    public UserResponseDTO registerUser(UserRequestDTO userRequestDTO) throws UserAlreadyExistsException {
        if (userRepository.existsByEmail(userRequestDTO.getEmail())) {
            throw new UserAlreadyExistsException("User with email " + userRequestDTO.getEmail() + " already exists.");
        }

        User user;
        if (userRequestDTO instanceof OrganizerRequestDTO) {
            user = UserMapper.INSTANCE.organizerRequestDTOToOrganizer((OrganizerRequestDTO) userRequestDTO);
        } else if (userRequestDTO instanceof VendorRequestDTO) {
            user = UserMapper.INSTANCE.vendorRequestDTOToVendor((VendorRequestDTO) userRequestDTO);
        } else {
            user = UserMapper.INSTANCE.userRequestDTOToUser(userRequestDTO);
        }

        user.setPassword(passwordEncoder.encode(userRequestDTO.getPassword()));
        user = userRepository.save(user);

        // Return the appropriate response DTO based on user type
        if (user instanceof Organizer) {
            return UserMapper.INSTANCE.organizerToOrganizerResponseDTO((Organizer) user);
        } else if (user instanceof Vendor) {
            return UserMapper.INSTANCE.vendorToVendorResponseDTO((Vendor) user);
        } else {
            return UserMapper.INSTANCE.userToUserResponseDTO(user);
        }
    }

    @Override
    public LoginResponseDTO loginUser(String email, String password) throws UserNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: " + email));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new UserNotFoundException("Invalid credentials");
        }

        UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);
        String token = jwtUtil.generateToken(userDetails);

        jwtUtil.setAuthentication(user);

        UserResponseDTO userResponse;
        if (user instanceof Vendor) {
            userResponse = userMapper.vendorToVendorResponseDTO((Vendor) user);
        } else if (user instanceof Organizer) {
            userResponse = userMapper.organizerToOrganizerResponseDTO((Organizer) user);
        } else {
            userResponse = userMapper.userToUserResponseDTO(user);
        }

        return new LoginResponseDTO(token, userResponse);
    }
}
