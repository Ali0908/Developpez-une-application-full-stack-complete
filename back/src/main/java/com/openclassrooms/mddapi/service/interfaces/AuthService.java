package com.openclassrooms.mddapi.service.interfaces;

import com.openclassrooms.mddapi.dto.RegisterRequest;
import com.openclassrooms.mddapi.dto.LoginRequest;
import com.openclassrooms.mddapi.dto.AuthResponse;

import java.util.Optional;

public interface AuthService {
    /**
     * Register a new user
     *
     * @param request {@link RegisterRequest}
     * @return {@link AuthResponse}
     */
    Optional<AuthResponse> register(RegisterRequest request);

    /**
     * Log a user
     *
     * @param request {@link LoginRequest}
     * @return {@link AuthResponse}
     */
    Optional<AuthResponse> login(LoginRequest request);
}
