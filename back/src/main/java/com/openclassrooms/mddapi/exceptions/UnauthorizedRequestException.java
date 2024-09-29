package com.openclassrooms.mddapi.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UnauthorizedRequestException extends RuntimeException{
    public UnauthorizedRequestException(String message) {
        super(message);
    }
}
