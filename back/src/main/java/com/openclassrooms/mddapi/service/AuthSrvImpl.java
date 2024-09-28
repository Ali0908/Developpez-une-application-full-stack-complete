package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.config.TokenType;
import com.openclassrooms.mddapi.dto.RegisterRequest;
import com.openclassrooms.mddapi.dto.AuthResponse;
import com.openclassrooms.mddapi.model.Token;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.repository.TokenRepository;
import com.openclassrooms.mddapi.service.interfaces.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthSrvImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtSrvImpl jwtSrvImpl;
    private final TokenRepository tokenRepository;

    public Optional<AuthResponse> register(RegisterRequest request) {
        var user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        var savedUser = userRepository.save(user);
        var jwtToken = jwtSrvImpl.generateToken(user);
        saveUserToken(savedUser, jwtToken);
        return Optional.of(AuthResponse.builder()
                .token(jwtToken)
                .build());
    }
    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }
}
