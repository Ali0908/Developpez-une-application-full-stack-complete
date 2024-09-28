package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.AuthResponse;
import com.openclassrooms.mddapi.exceptions.BadRequestException;
import com.openclassrooms.mddapi.service.interfaces.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.openclassrooms.mddapi.dto.RegisterRequest;
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
    public Optional<AuthResponse> register(@RequestBody @Validated RegisterRequest request, BindingResult result) {
        if (result.hasErrors()) {
            String errorMessage = result.getAllErrors().stream()
                    .map(ObjectError::getDefaultMessage)
                    .collect(Collectors.joining(", "));
            throw new BadRequestException(errorMessage);
        }
        return authSrv.register(request);
    }
}
