package com.openclassrooms.mddapi.service.interfaces;

import com.openclassrooms.mddapi.dto.request.RegisterDtoRequest;
import com.openclassrooms.mddapi.dto.request.UserDto;
import com.openclassrooms.mddapi.dto.response.AuthDtoResponse;
import com.openclassrooms.mddapi.dto.request.LoginDtoRequest;
import com.openclassrooms.mddapi.dto.response.UserDtoResponse;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

public interface AuthService {
    /**
     * Register a new user
     *
     * @param request {@link RegisterDtoRequest}
     * @return {@link AuthDtoResponse}
     */
    Optional<AuthDtoResponse> register(RegisterDtoRequest request);

    /**
     * Log a user
     *
     * @param request {@link LoginDtoRequest}
     * @return {@link AuthDtoResponse}
     */
    Optional<AuthDtoResponse> login(LoginDtoRequest request);

    /**
     * Log out a user
     */
    void logout();

    /**
     * Get the current user
     *
     * @return {@link UserDtoResponse}
     */
    Optional<UserDtoResponse> authenticate();

    /**
     * Update the current user
     *
     * @return {@link UserDtoResponse}
     */
    ResponseEntity<String> update(UserDto userDto);
}
