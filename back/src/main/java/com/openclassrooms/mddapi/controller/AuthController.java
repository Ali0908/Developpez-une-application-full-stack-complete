package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.request.RegisterDtoRequest;
import com.openclassrooms.mddapi.dto.request.UserDto;
import com.openclassrooms.mddapi.dto.response.AuthDtoResponse;
import com.openclassrooms.mddapi.dto.request.LoginDtoRequest;
import com.openclassrooms.mddapi.dto.response.UserDtoResponse;
import com.openclassrooms.mddapi.service.interfaces.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authSrv;
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public Optional<AuthDtoResponse> register(@RequestBody @Validated RegisterDtoRequest request) {
        return authSrv.register(request);
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.CREATED)
    public Optional<AuthDtoResponse> login(
            @RequestBody @Validated LoginDtoRequest loginRequest) {

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
    public ResponseEntity<String> update(@RequestBody UserDto userDto) {
         authSrv.update(userDto);
        return ResponseEntity.ok("User updated successfully");
    }
}
