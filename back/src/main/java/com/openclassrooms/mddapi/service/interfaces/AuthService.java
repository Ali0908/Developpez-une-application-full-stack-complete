package com.openclassrooms.mddapi.service.interfaces;

import com.openclassrooms.mddapi.dto.RegisterDtoRequest;
import com.openclassrooms.mddapi.dto.LoginDtoRequest;
import com.openclassrooms.mddapi.dto.AuthDtoResponse;
import com.openclassrooms.mddapi.dto.UserDtoResponse;

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
}
