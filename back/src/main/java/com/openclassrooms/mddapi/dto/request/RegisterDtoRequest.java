package com.openclassrooms.mddapi.dto.request;

import com.openclassrooms.mddapi.validation.ValidPassword;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotBlank;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDtoRequest {
    @NotBlank(message = "Username is required")
    private String username;
    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is mandatory")
    private String email;
    @ValidPassword
    private String password;
}
