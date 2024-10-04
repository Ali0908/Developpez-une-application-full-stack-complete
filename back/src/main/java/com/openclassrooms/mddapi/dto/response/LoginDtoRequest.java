package com.openclassrooms.mddapi.dto.response;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginDtoRequest {
    @Email(message = "Email is not valid")
    @NotBlank(message = "error")
    private String email;
    @NotBlank(message = "error")
    String password;
}
