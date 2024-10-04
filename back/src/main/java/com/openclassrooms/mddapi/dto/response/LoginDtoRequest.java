package com.openclassrooms.mddapi.dto.response;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginDtoRequest {

    @NotEmpty(message = "error")
    private String identifier;
    @NotBlank(message = "error")
    String password;
}
