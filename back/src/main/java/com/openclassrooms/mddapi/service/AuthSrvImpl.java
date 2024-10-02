package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.config.TokenType;
import com.openclassrooms.mddapi.dto.*;
import com.openclassrooms.mddapi.model.Token;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.UserRepository;
import com.openclassrooms.mddapi.repository.TokenRepository;
import com.openclassrooms.mddapi.service.interfaces.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
    private final AuthenticationManager authenticationManager;


    public Optional<AuthDtoResponse> register(RegisterDtoRequest request) {
        var user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        var savedUser = userRepository.save(user);
        var jwtToken = jwtSrvImpl.generateToken(user);
        saveUserToken(savedUser, jwtToken);
        return Optional.of(AuthDtoResponse.builder()
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
    public Optional<AuthDtoResponse> login(LoginDtoRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            System.out.println("Authentication successful");
        } catch (BadCredentialsException e) {
            System.out.println("Bad credentials: Invalid email or password");
        } catch (Exception e) {
            System.out.println("Authentication failed due to: " + e.getMessage());
            throw e;
        }
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        var jwtToken = jwtSrvImpl.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return Optional.of(AuthDtoResponse.builder()
                .token(jwtToken)
                .build());
    }

    public void logout() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        revokeAllUserTokens(user);
    }

    public Optional<UserDtoResponse> authenticate() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return Optional.of(new UserDtoResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail()
        ));

    }

    public Optional<UserDtoResponse> update(UserDto userDto) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        userRepository.save(user);
        return Optional.of(new UserDtoResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail()
        ));
    }
    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(Math.toIntExact(user.getId()));
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }
}
