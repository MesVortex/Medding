package org.filrouge.medding.services.interfaces;

import org.filrouge.medding.dto.requests.UserRequestDTO;
import org.filrouge.medding.dto.responses.LoginResponseDTO;
import org.filrouge.medding.dto.responses.UserResponseDTO;
import org.filrouge.medding.exceptions.UserAlreadyExistsException;
import org.filrouge.medding.exceptions.UserNotFoundException;

public interface AuthService {
    UserResponseDTO registerUser(UserRequestDTO userRequestDTO) throws UserAlreadyExistsException;
    LoginResponseDTO loginUser(String email, String password) throws UserNotFoundException;
}
