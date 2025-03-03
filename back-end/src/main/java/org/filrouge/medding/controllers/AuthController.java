package org.filrouge.medding.controllers;

import org.filrouge.medding.dto.requests.LoginRequestDTO;
import org.filrouge.medding.dto.requests.OrganizerRequestDTO;
import org.filrouge.medding.dto.requests.UserRequestDTO;
import org.filrouge.medding.dto.requests.VendorRequestDTO;
import org.filrouge.medding.dto.responses.LoginResponseDTO;
import org.filrouge.medding.entities.enums.UserRole;
import org.filrouge.medding.exceptions.UserAlreadyExistsException;
import org.filrouge.medding.exceptions.UserNotFoundException;
import org.filrouge.medding.services.interfaces.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Map<String, Object> requestMap) {
        try {
            UserRequestDTO specificDTO;
            UserRole role = UserRole.valueOf((String) requestMap.get("role"));

            switch (role) {
                case VENDOR -> {
                    VendorRequestDTO vendorDTO = new VendorRequestDTO();
                    vendorDTO.setUsername((String) requestMap.get("username"));
                    vendorDTO.setEmail((String) requestMap.get("email"));
                    vendorDTO.setPassword((String) requestMap.get("password"));
                    vendorDTO.setRole(role);
                    vendorDTO.setLocation((String) requestMap.get("location"));
                    vendorDTO.setNumber((String) requestMap.get("number"));
                    specificDTO = vendorDTO;
                }
                case ORGANIZER -> {
                    OrganizerRequestDTO organizerDTO = new OrganizerRequestDTO();
                    organizerDTO.setUsername((String) requestMap.get("username"));
                    organizerDTO.setEmail((String) requestMap.get("email"));
                    organizerDTO.setPassword((String) requestMap.get("password"));
                    organizerDTO.setRole(role);
                    organizerDTO.setNumber((String) requestMap.get("number"));
                    specificDTO = organizerDTO;
                }
                default -> {
                    UserRequestDTO userDTO = new UserRequestDTO();
                    userDTO.setUsername((String) requestMap.get("username"));
                    userDTO.setEmail((String) requestMap.get("email"));
                    userDTO.setPassword((String) requestMap.get("password"));
                    userDTO.setRole(role);
                    specificDTO = userDTO;
                }
            }

            return ResponseEntity.ok(authService.registerUser(specificDTO));
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequest) {
        try {
            LoginResponseDTO response = authService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());
            return ResponseEntity.ok(response);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred: " + e.getMessage());
        }
    }
}
