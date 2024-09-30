package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.*;
import com.openclassrooms.mddapi.exceptions.BadRequestException;
import com.openclassrooms.mddapi.exceptions.UnauthorizedRequestException;
import com.openclassrooms.mddapi.service.interfaces.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.validation.ObjectError;



import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authSrv;
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public Optional<AuthDtoResponse> register(@RequestBody @Validated RegisterDtoRequest request, BindingResult result) {
        if (result.hasErrors()) {
            String errorMessage = result.getAllErrors().stream()
                    .map(ObjectError::getDefaultMessage)
                    .collect(Collectors.joining(", "));
            throw new BadRequestException(errorMessage);
        }
        return authSrv.register(request);
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.CREATED)
    public Optional<AuthDtoResponse> login(
            @RequestBody @Validated LoginDtoRequest loginRequest, BindingResult result
    ) {
        if (result.hasErrors()) {
            String errorMessage = result.getAllErrors().stream()
                    .map(ObjectError::getDefaultMessage)
                    .collect(Collectors.joining(", "));
            throw new UnauthorizedRequestException(errorMessage);
        }
        return authSrv.login(loginRequest);
    }

    @DeleteMapping("/logout")
    public ResponseEntity<String> logout() {
        authSrv.logout();
        return ResponseEntity.ok("Logout successful");
    }


    @GetMapping("/me")
    public Optional<UserDtoResponse> authenticate() {
        return authSrv.authenticate();
    }

    @PutMapping("/me")
    public Optional<UserDtoResponse> update(@RequestBody UserDto userDto) {
        return authSrv.update(userDto);
    }
}
